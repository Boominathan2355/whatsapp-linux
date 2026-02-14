# 01. Project Setup

## Overview
This document covers the initialization of the WhatsApp Desktop Wrapper project, including the directory structure and core dependencies.

## Dependencies

### Runtime
- **electron-context-menu**: Adds a native-looking context menu (copy, paste, spellcheck) to the renderer, essential for a web wrapper.

### Development
- **electron**: The core framework for building the desktop app.
- **electron-builder**: A complete solution to package and build a ready for distribution Electron app for Linux (AppImage, Snap, Deb).

## Configuration
The `package.json` has been initialized with default values. We will add the following scripts:
- `start`: `electron .` to run the app locally.
- `dist`: `electron-builder` to build the distributables.

## Directory Structure
- `src/`: Will contain the source code (`main.js`, `preload.js`).
- `build_config/`: Will contain build resources (icons, etc.).
- `project_docs/`: Documentation for each feature.
