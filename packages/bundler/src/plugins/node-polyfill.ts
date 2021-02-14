import type { Plugin } from 'esbuild';
import path from 'path';
export const pluginNodePolyfill = (): Plugin => {
  return {
    name: 'plugin-node-polyfill',
    setup(build) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        // remap builtins
        const polyfillMap = {
          url: require.resolve('url/'),
          assert: require.resolve('assert/'),
          buffer: require.resolve('buffer/'),
          fs: require.resolve('memfs'),
          'jest-worker': path.resolve(__dirname, '../src/utils/jest-worker.ts'),
          path: require.resolve('path-browserify'),
          stream: require.resolve('stream-browserify'),
          os: require.resolve('os-browserify/browser'),
          crypto: require.resolve('crypto-browserify'),
          vm: require.resolve('vm-browserify'),
          tty: require.resolve('tty-browserify'),
        };
        if (Object.keys(polyfillMap).includes(args.path)) {
          return {
            path: polyfillMap[args.path as 'os'],
          };
        }
      });
    },
  };
};
