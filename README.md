# WhatsApp Linux

A secure, native-like WhatsApp Web wrapper for Linux, built with Electron.

## Features

-   **Native Integration**: System tray support, start on login, and native notifications.
-   **Enhanced Security**:
    -   Strict **Content Security Policy (CSP)** to prevent XSS and data leaks.
    -   **Navigation Locking**: The app is "jailed" to `whatsapp.com`, blocking external phishing links.
    -   **Sandboxing**: Node integration disabled and Context Isolation enabled.
-   **Linux Optimized**:
    -   Supports **Wayland** & **X11**.
    -   **Screen Sharing** support via `WebRTCPipeWireCapturer`.
    -   Tested on Ubuntu/Debian.
-   **Privacy Focused**: Open source and transparent.

## Installation

### Option 1: AppImage (Recommended)

Works on most Linux distributions (Ubuntu, Fedora, Arch, etc.).

1.  Download the latest `.AppImage` from the [Releases](https://github.com/boominathan2355/whatsapp-linux/releases) page.
2.  Make it executable:
    ```bash
    chmod +x "WhatsApp Linux-1.0.0.AppImage"
    ```
3.  Run it:
    ```bash
    ./"WhatsApp Linux-1.0.0.AppImage" --no-sandbox
    ```

### Option 2: Snap

```bash
sudo snap install whatsapp-linux_1.0.0_amd64.snap --dangerous
```
*(Note: `--dangerous` is required because this snap is installed locally and not from the Snap Store).*

### Option 3: DEB Package (Ubuntu/Debian)

```bash
sudo dpkg -i whatsapp-linux_1.0.0_amd64.deb
sudo apt-get install -f  # Fix dependencies if needed
```

## Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/boominathan2355/whatsapp-linux.git
    cd whatsapp-linux
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run locally**:
    ```bash
    npm start
    ```

4.  **Build for production**:
    ```bash
    npm run dist
    ```
    Output will be in the `dist/` directory.

## Security

This application implements several security measures to ensure a safe browsing experience:
-   **CSP**: Blocks unauthorized scripts, styles, and connections.
-   **Permission Handler**: Automatically manages permissions for Mic, Camera, and Notifications while blocking sensitive requests like Geolocation by default.
-   **External Links**: All non-WhatsApp links open in your default system browser.

## Author

**Boominathan Alagirisamy**
-   GitHub: [@boominathan2355](https://github.com/boominathan2355)

## License

MIT License
