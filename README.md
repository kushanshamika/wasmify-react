# WASMIFY REACT

![Placeholder for Logo](https://i.ibb.co/bgK0FmQ/wasify-react.png)

A React-based framework that allows users to generate applications pre-configured with WebAssembly (WASM) support using Go.

---

## Links

- **[User Guide](#)**: Detailed documentation on how to use WASMIFY REACT.
- **[Report an Issue](https://github.com/kushanshamika/wasmify-react/issues)**: Found a bug? Help us improve by reporting it.

---

## Quick Overview

To create a new project with **WASMIFY REACT**, run the following commands:

```bash
npx create-wasmify-react my-app
cd my-app
npm start
```

This will create a new React project with WebAssembly (WASM) support using Go, ready to use. You can then start building your app immediately!

---

## Pre-requisites

Make sure the following are installed and properly set up:

- **Go LTS**: Ensure that Go is installed, and the paths are correctly set.

### Verify Go Installation

To verify that Go is installed, run the following command in your terminal:

```bash
go version
```

You should see the Go version displayed.

### Build WASM file

After setting up the project, you can build the WebAssembly file by running the following command:

```bash
npm run wasm-build
```

This will generate the necessary `.wasm` files in the appropriate directory.

---

## Framework Structure

When you create a new project using **WASMIFY REACT**, you will get the following directory structure:

```
my-app/
├── node_modules/
├── public/
│   ├── wasm/
│   │   └── build
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── hooks/
│   │   └── useWASM.js
│   ├── wasm/
│   │   └── go/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   ├── logo.svg
│   └── wasm-setup.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

- **`public/`**: Contains the static assets like the HTML file and favicon.
- **`src/`**: Main directory for React components and WebAssembly modules.
  - **`wasm/go`**: Directory to store the `.go` files.
  - **`hooks/useWASM.js`**: React hook that imports the WebAssembly modules.
- **`.gitignore`**: Files and folders ignored by Git.
- **`package.json`**: Contains project dependencies and scripts.
  
---

## License

This project is licensed under the MIT License.

---

Enjoy building your next WASM-powered React application with **WASMIFY REACT**!