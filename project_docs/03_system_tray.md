# 03. System Tray Integration

## Overview
To provide a true messaging app experience, the application minimizes to the system tray instead of closing when the 'X' button is clicked. This allows the app to stay connected and receive notifications in the background.

## Implementation

### Tray Creation
- **Icon**: Located at `src/assets/icon.png`.
- **Menu**:
    - **Show App**: Restores the window.
    - **Quit**: Fully terminates the application.
- **Click Behavior**: Toggles visibility (Show/Hide).

### Close Interception
We listen for the `close` event on `mainWindow`.
- If `isQuitting` is false (default), we prevent the default close action and instead call `mainWindow.hide()`.
- If `isQuitting` is true (set when clicking 'Quit' in the tray), we allow the app to close.

### Linux Behavior
- Works with standard system trays (Gnome Extension might be needed for newer Gnome versions that deprecated the tray, but `libappindicator` usually handles it).
- **Note**: Ensure `libappindicator` is installed on the target Linux system if the tray icon doesn't appear.

## Code Location
- `src/main.js`: `createTray` function and `before-quit` / `close` event handlers.
