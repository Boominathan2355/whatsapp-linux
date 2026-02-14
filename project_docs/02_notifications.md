# 02. Notifications

## Overview
WhatsApp Web uses the standard HTML5 Notification API. Electron supports this out of the box, forwarding these notifications to the host operating system's notification center (notification-daemon, dunst, gnome-shell, etc. on Linux).

## Implementation Details

### Permission Handling
The key to making this work is ensuring Electron approves the permission request.
In `src/main.js`, we have implemented a permission request handler:

```javascript
session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = ['media', 'notifications', 'fullscreen'];
    if (allowedPermissions.includes(permission)) {
        callback(true); // Approve
    } else {
        callback(false); // Deny
    }
});
```

### Linux Integration
- **App ID**: Standard notifications will key off the application name.
- **Sound**: Notification sounds are handled by the renderer (WhatsApp Web itself playing audio), or by the OS if the notification carries a sound hint.
- **Actions**: WhatsApp Web notifications usually just alert the user. Clicking them focuses the window.

## Verification
1. Open the app.
2. Wait for WhatsApp to ask for notification permissions (or check the banner).
3. Send a message to the logged-in account from another device.
4. Verify a native Linux notification appears.
