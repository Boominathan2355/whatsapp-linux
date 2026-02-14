const { app, BrowserWindow, shell, session, Tray, Menu } = require('electron');
const path = require('path');
const contextMenu = require('electron-context-menu');

// Initialize context menu
contextMenu({
    showSaveImageAs: true,
    showCopyImageAddress: true,
    showInspectElement: false // Disable in production
});

let mainWindow;

function createWindow() {
    // 1. Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#111b21', // WhatsApp Web dark background
        title: 'WhatsApp',
        webPreferences: {
            nodeIntegration: false, // Security: Disable Node integration in renderer
            contextIsolation: true, // Security: Isolate context
            preload: path.join(__dirname, 'preload.js'),
            // Enable spellcheck
            spellcheck: true
        }
    });

    // 2. Load WhatsApp Web
    const whatsappUrl = 'https://web.whatsapp.com';

    // REVERTED: Using default Electron User Agent (Linux)
    // We must still provide a MODERN Linux User Agent, otherwise WhatsApp thinks Chrome is too old.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    app.userAgentFallback = userAgent;

    mainWindow.loadURL(whatsappUrl, { userAgent });

    // Clear Service Worker cache to force feature re-check
    // (Uncomment if issues persist)
    // mainWindow.webContents.session.clearStorageData({
    //     storages: ['serviceworkers', 'cachestorage']
    // });

    // Debugging: Log load events
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('WhatsApp Web loaded successfully');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
        console.error('Failed to load:', validatedURL);
        console.error('Error Description:', errorDescription);
        console.error('Error Code:', errorCode);
    });


    // 3. Handle external links
    // SECURITY: Block all navigation that is not to WhatsApp.
    // This effectively jails the app to the target site.
    mainWindow.webContents.on('will-navigate', (event, url) => {
        const parsedUrl = new URL(url);
        if (!parsedUrl.hostname.includes('whatsapp.com') && !parsedUrl.hostname.includes('whatsapp.net')) {
            event.preventDefault();
            console.log('Blocked navigation to:', url);
        }
    });

    // SECURITY: Open external links in default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        // Allow WhatsApp internal windows (e.g. Terms, Flows, Call windows if popup)
        if (url.includes('whatsapp.com') || url.includes('whatsapp.net')) {
            return { action: 'allow' };
        }
        // Open everything else in external browser
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // SECURITY: Content Security Policy (CSP)
    // Inject strict CSP to prevent loading of unauthorized scripts/objects
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        const responseHeaders = Object.assign({}, details.responseHeaders);

        // delete existing CSP headers to prevent conflict/merging (browser enforces strictest)
        Object.keys(responseHeaders).forEach(key => {
            if (key.toLowerCase() === 'content-security-policy') {
                delete responseHeaders[key];
            }
        });

        callback({
            responseHeaders: {
                ...responseHeaders,
                'Content-Security-Policy': [
                    "default-src 'self' https://web.whatsapp.com https://*.whatsapp.net https://*.whatsapp.com blob: data: filesystem:; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://web.whatsapp.com https://*.whatsapp.net https://*.whatsapp.com blob: data:; " +
                    "worker-src 'self' blob: data: https://web.whatsapp.com https://*.whatsapp.net; " +
                    "style-src 'self' 'unsafe-inline' https://web.whatsapp.com https://*.whatsapp.net https://*.whatsapp.com; " +
                    "img-src 'self' https://web.whatsapp.com https://*.whatsapp.net https://*.whatsapp.com data: blob: https://*.cdn.whatsapp.net https://*.fbsbx.com; " +
                    "connect-src 'self' https://web.whatsapp.com https://*.whatsapp.net https://*.whatsapp.com wss://*.whatsapp.net wss://web.whatsapp.com wss://*.whatsapp.com https://*.cdn.whatsapp.net; " +
                    "font-src 'self' data: https://*.whatsapp.net https://*.whatsapp.com; " +
                    "media-src 'self' blob: https://*.whatsapp.net https://*.whatsapp.com https://*.cdn.whatsapp.net;"
                ]
            }
        });
    });

    // 4. Handle window close
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // 5. Basic Permissions Handler (Camera/Mic for calls)
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        const allowedPermissions = [
            'media',                // Camera/Microphone
            'display-capture',      // Screen Sharing
            'notifications',        // Push Notifications
            'fullscreen',           // Fullscreen Video
            'pointerLock'           // Mouse Lock
        ];
        if (allowedPermissions.includes(permission)) {
            callback(true); // Approve
        } else {
            console.log('Denied Permission:', permission);
            callback(false); // Deny
        }
    });

    // 6. Linux specific: Enable WebRTC PipeWire Capturer
    // 6. Linux specific: Enable WebRTC PipeWire Capturer
    app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');
    app.commandLine.appendSwitch('enable-usermedia-screen-capturing');
    app.commandLine.appendSwitch('allow-http-screen-capture');
    app.commandLine.appendSwitch('disable-site-isolation-trials');

    // 7. Handle Close (Minimize to Tray)
    mainWindow.on('close', (event) => {
        if (!isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            return false;
        }
    });
}

let tray = null;
let isQuitting = false;

function createTray() {
    const iconPath = path.join(__dirname, 'assets', 'icon.png');
    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Quit',
            click: () => {
                isQuitting = true;
                app.quit();
            }
        }
    ]);
    tray.setToolTip('WhatsApp Wrapper');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

// 8. Auto-start on login
const appFolder = path.dirname(process.execPath);
const updateExe = path.resolve(appFolder, '..', 'Update.exe');
const exeName = path.basename(process.execPath);

app.setLoginItemSettings({
    openAtLogin: true,
    path: updateExe,
    args: [
        '--process-start-args', `"--hidden"`
    ]
});

// Ensure single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.show(); // Ensure it acts as restore from tray too
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();
        createTray();

        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });
}

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
