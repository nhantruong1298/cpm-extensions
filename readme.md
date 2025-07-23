## Build Instructions

Follow these steps to build the project:

1. **Open a terminal** in your project directory.

2. **Install dependencies** (if you haven't already):

    ```bash
    npm install
    ```

3. **Build the project using Webpack:**

    ```bash
    npm run build
    ```

    This will bundle your source files and output them to the `dist` directory.

4. **(Optional) Watch for changes and auto-build:**

    ```bash
    npm run watch
    ```

5. **Load the extension in Chrome for testing:**

    - Open Chrome and go to `chrome://extensions/`
    - Enable "Developer mode"
    - Click "Load unpacked" and select the `dist` folder