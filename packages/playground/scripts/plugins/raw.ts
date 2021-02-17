import { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';
export const pluginRaw = (): Plugin => {
  return {
    name: 'raw',
    setup(build) {
      build.onResolve({ filter: /^raw:/ }, (args) => {
        console.log('resolve args:', args);
        const realPath = args.path.replace(/^raw:/, '');

        return {
          path: path.resolve(args.resolveDir, realPath),
          namespace: '_raw',
        };
      });

      build.onLoad({ filter: /.*/, namespace: '_raw' }, async (args) => {
        console.log('load args:', args);
        const contents = await fs.promises.readFile(args.path);
        return {
          contents: contents.toString(),
          loader: 'text',
        };
      });
    },
  };
};
