import * as esbuild from 'esbuild';
import path from 'path';
import minimist from 'minimist';
import fs from 'fs';
import vm from 'vm';
import liveServer from 'live-server';
import { pluginPostcss } from './plugins/postcss';
import { pluginFn } from './plugins/fn';
import { pluginWorker } from './plugins/worker';
import { pluginRaw } from '@neo-tools/raw';
async function main() {
  const argv = minimist(process.argv.slice(2));
  const outdir = path.join(__dirname, '../public');
  process.env.NODE_ENV = 'development';
  esbuild.build({
    entryPoints: [path.join(__dirname, '../src/index.tsx')],
    outdir,
    watch: argv.watch,
    sourcemap: 'external',
    mainFields: ['esbuild', 'browser', 'module', 'main'],
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
    plugins: [pluginPostcss(), pluginFn(), pluginWorker(), pluginRaw()],
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
