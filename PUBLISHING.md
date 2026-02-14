# Publishing Guide

Since this is a secure application, you likely want to publish it to the **Snap Store** (Ubuntu App Center) or **GitHub Releases**.

## Option 1: Publish to Snap Store (Ubuntu App Center)

This is the best way to get your app to millions of Ubuntu users.

### Prerequisites
1.  **Create an Account**: Go to [snapcraft.io](https://snapcraft.io/) and create an account.
2.  **Register App Name**: 
    -   Log in to the dashboard.
    -   Register the name `whatsapp-linux` (or a variation if taken, like `whatsapp-linux-unofficial`).
    -   *Note: If you change the name, update `name` in `package.json` and rebuild!*

### Steps to Upload
You need to install the `snapcraft` tool to upload your app.

1.  **Install Snapcraft**:
    ```bash
    sudo snap install snapcraft --classic
    ```

2.  **Login**:
    ```bash
    snapcraft login
    ```
    (Follow the instructions to authorize in your browser).

3.  **Register the Name (CLI)**:
    If you haven't done it on the web, try:
    ```bash
    snapcraft register whatsapp-linux
    ```

4.  **Upload the Snap**:
    Push your built `.snap` file to the store:
    ```bash
    snapcraft upload --release=stable dist/whatsapp-linux_1.0.0_amd64.snap
    ```

5.  **Release**:
    Once uploaded, go to the [Snapcraft Dashboard](https://snapcraft.io/mysnaps) to add descriptions, screenshots, and publish it to the "Stable" channel.

---

## Option 2: Publish to GitHub Releases

This is great for developers and power users.

1.  Go to your repository: [https://github.com/boominathan2355/whatsapp-linux](https://github.com/boominathan2355/whatsapp-linux)
2.  Click **Releases** > **Draft a new release**.
3.  **Tag version**: `v1.0.0`.
4.  **Title**: `Initial Release - Secure WhatsApp Wrapper`.
5.  **Description**: Paste the contents of your `README.md` or a short summary.
6.  **Attach Binaries**: Drag and drop the following files from your `dist/` folder:
    -   `WhatsApp Linux-1.0.0.AppImage`
    -   `whatsapp-linux_1.0.0_amd64.deb`
    -   `whatsapp-linux_1.0.0_amd64.snap`
7.  Click **Publish release**.

Your users can now download the app directly from GitHub!
