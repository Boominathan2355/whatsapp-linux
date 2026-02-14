# 05. Packaging & Distribution

## Overview
We use `electron-builder` to package the application into distributable formats for Linux. The configuration is defined in `package.json` under the `build` key.

## Supported Formats

### AppImage (Recommended)
- **Format**: A single portable executable file.
- **Why**: Does not require installation or root access. Works on almost all Linux distributions.
- **Build Output**: `dist/WhatsApp Linux-1.0.0.AppImage`

### Deb (Debian/Ubuntu)
- **Format**: Native package format for Debian-based systems.
- **Why**: Integrates with the system package manager (apt).
- **Build Output**: `dist/whatsapp-linux_1.0.0_amd64.deb`

### Snap (Canonical)
- **Format**: Sandboxed containerized package.
- **Why**: Auto-updates (if published to Snap Store) and security.
- **Note**: Snap builds require `snapcraft` to be installed on the build machine.

## How to Build
Run the following command in the project root:

```bash
npm run dist
```

This will generate the artifacts in the `dist/` folder.
To modify the build targets, edit the `build.linux.target` array in `package.json`.
