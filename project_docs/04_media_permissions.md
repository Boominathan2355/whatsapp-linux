# 04. Permissions & Media Support

## Overview
Voice and Video calls are a critical feature of the WhatsApp Desktop experience. This wrapper ensures that WhatsApp Web has the necessary access to the user's hardware.

## Implementation

### Automatic Permission Granting
Electron defaults to denying permissions or asking wildly. We implemented a handler to automatically approve essential permissions:
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
- **media**: Covers Camera and Microphone access.
- **notifications**: Covers Desktop Notifications.
- **fullscreen**: Allows full-screen video playback.

### Linux Screen Sharing (Wayland/PipeWire)
We appended the following switch to the command line:
```javascript
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');
```
This enables the modern WebRTC stack necessary for screen sharing on modern Linux distributions that use Wayland and PipeWire (e.g., Ubuntu 22.04+, Fedora).

## Verification
1. Start a Voice or Video call.
2. Ensure the camera light turns on (if applicable) and audio is captured.
3. Attempt to screen share during a call. The system picker for sharing windows/screens should appear.
