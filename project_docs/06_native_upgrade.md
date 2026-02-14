# 06. Native Experience Upgrade

## Overview
To provide a true desktop application feel, we implement several enhancements to hide the fact that this is a web wrapper.

## Visual Enhancements (CSS Injection)
We inject custom CSS via `preload.js` to target and hide specific web elements that clutter the UI or nag the user to "Get the App".

### Hidden Elements
- **Download Banners**: Any link or button urging the download of the Windows app.
- **Beta Logos**: Startup logos that might indicate a web beta.

### Scrollbars
We override the default browser scrollbars with thinner, "native-like" dark scrollbars that blend better with the WhatsApp Dark theme.

## Platform Spoofing
As detailed in previous sections, we force `navigator.platform` to `Win32` to unlock features. This, combined with the visual cleanup, makes the app indistinguishable from the native Windows client in terms of functionality.

## Verification
1.  **Launch**: App should open without any "Download" banners at the top of the chat list.
2.  **Scroll**: Chat scrollbars should be thin and dark, not default grey blocks.
3.  **Function**: Calls work natively.
