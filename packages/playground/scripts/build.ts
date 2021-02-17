import * as esbuild from 'esbuild';
import path from 'path';
import minimist from 'minimist';
import fs from 'fs';
import vm from 'vm';
import liveServer from 'live-server';
import { pluginPostcss } from './plugins/postcss';
async function main() {
  const argv = minimist(process.argv.slice(2));
  const outdir = path.join(__dirname, '../public');
  process.env.NODE_ENV = 'development';
  esbuild.build({
    entryPoints: [path.join(__dirname, '../src/index.tsx')],
    outdir,
    watch: argv.watch,
    sourcemap: 'external',
    logLevel: 'error',
    errorLimit: 1,
    bundle: true,
    jsxFactory: 'jsx',
    minify: argv.build,
    inject: [path.join(__dirname, '../shims/react-shim.js')],
    loader: {
      '.svg': 'dataurl',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    plugins: [
      pluginPostcss(),
      {
        name: 'fn',
        setup(build) {
          build.onResolve({ filter: /^fn:/ }, (args) => {
            const realPath = args.path.replace(/^fn:/, '');
            const [fnPath, n] = realPath.split('?');
            return {
              namespace: 'fn',
              path: path.isAbsolute(fnPath) ? fnPath : path.join(args.resolveDir, fnPath),
              pluginData: {
                n,
              },
            };
          });
          build.onLoad({ filter: /.*/, namespace: 'fn' }, async (args) => {
            const code = (await fs.promises.readFile(args.path)).toString();
            const context = {};
            vm.createContext(context);
            const fn = await vm.runInContext(code, context);
            const result = fn(args.pluginData.n);
            return {
              contents: `export default ${result}`,
              loader: 'ts',
            };
          });
        },
      },
      {
        name: 'worker',
        setup(build) {
          build.onResolve({ filter: /^worker:/ }, (args) => {
            const realPath = args.path.replace(/^worker:/, '');
            console.log('realPath:', realPath);
            return {
              path: path.isAbsolute(realPath) ? realPath : path.join(args.resolveDir, realPath),
              namespace: 'worker',
            };
          });
          build.onLoad({ filter: /.*/, namespace: 'worker' }, async (args) => {
            const result = await esbuild.build({
              entryPoints: [args.path],
              bundle: true,
              platform: 'browser',
              write: false,
              format: 'esm',
            });
            const code = result.outputFiles?.[0].text ?? '';
            const contents = `
              const blob = new Blob([${JSON.stringify(code)}], { type: 'text/javascript' });
              export default () => {
                const worker = new Worker(window.URL.createObjectURL(blob));
                return worker;
              }
              `;
            return {
              contents,
              loader: 'ts',
            };
          });
        },
      },
    ],
  });
  if (argv.watch) {
    liveServer.start({
      // Opens the local server on start.
      open: true,
      // Uses `PORT=...` or 8080 as a fallback.
      port: Number(process.env.PORT) || 8080,
      // Uses `public` as the local server folder.
      root: 'public',
    });
  }
}
main();
