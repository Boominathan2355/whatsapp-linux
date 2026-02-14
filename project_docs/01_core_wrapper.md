# 02. Core Wrapper Implementation

## Overview
This document details the implementation of the main process, which serves as the core wrapper for WhatsApp Web.

## Key Features

### Browser Window Configuration
- **Dimensions**: 1200x800 default size.
- **Security**: Node integration disabled, context isolation enabled.
- **User Agent**: Spoofed to a recent Linux Chrome version to ensure WhatsApp Web compatibility.

### Permission Handling
- **Media**: Automatically grants permission for microphone and camera access, essential for voice and video calls.
- **Notifications**: Automatically grants permission for desktop notifications.

### Single Instance Lock
- Ensures only one instance of the application runs at a time. If a second instance is launched, the existing window is focused.

### External Links
- **Logic**: Any link that is *not* part of `web.whatsapp.com` is opened in the user's default external browser. This prevents users from getting stuck in a web view within the app.

### Linux Specifics
- **WebRTC PipeWire Capturer**: Enabled via command line switch to support screen sharing on Wayland/PipeWire systems.

## Code Location
- `src/main.js`: Main process logic.
- `src/preload.js`: Preload script for secure communication bridge.
