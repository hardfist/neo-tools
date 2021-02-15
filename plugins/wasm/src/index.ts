import type { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';
const wasmVirtual = 'wasm-virtual';
const wasmBinary = 'wasm-binary';
export const wasm = (): Plugin => {
  return {
    name: 'wasm',
    setup(build) {
      // load wasm proxy virutal module
      build.onLoad({ filter: /.*/, namespace: wasmVirtual }, (args) => {
        return {
          contents: `import wasm from ${JSON.stringify(args.path)}
        export default (imports) =>
          WebAssembly.instantiate(wasm, imports).then(
            result => result.instance.exports)`,
        };
      });
      // resolve real wasm binary from virtual-wam
      build.onResolve({ filter: /\.wasm$/, namespace: wasmVirtual }, (args) => {
        return {
          path: args.path,
          namespace: wasmBinary,
        };
      });
      // just load wasm as binary
      build.onLoad({ filter: /\.wasm$/, namespace: wasmBinary }, async (args) => {
        return {
          contents: await fs.promises.readFile(args.path),
          loader: 'binary',
        };
      });
      // convert wasm import from your code to wasm virtual module
      build.onResolve({ filter: /\.wasm$/ }, (args) => {
        if (args.importer.endsWith('.ts')) {
          return {
            path: path.isAbsolute(args.path) ? args.path : path.join(args.resolveDir, args.path),
            namespace: wasmVirtual,
          };
        }
      });
    },
  };
};
