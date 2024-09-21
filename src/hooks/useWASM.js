import { useEffect } from 'react';

export const useWASM = (wasmModulePath) => {

    useEffect(() => {
        const loadWASM = async () => {
            if (typeof window.Go !== 'undefined') {
                const go = new window.Go();
                const response = await fetch(wasmModulePath);
                const buffer = await response.arrayBuffer();
                const wasm = await WebAssembly.instantiate(buffer, go.importObject);
                go.run(wasm.instance);
            } else {
                console.error('Go runtime not found. Make sure wasm_exec.js is loaded.');
            }
        };

        loadWASM();
    }, [wasmModulePath]);

    const callWASMFunction = (funcName, args) => {
        if (window[funcName]) {
            return window[funcName](...args);
        }
        return null;
    };

    return { callWASMFunction };
};
