import { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';
export const pluginRaw = (): Plugin => {
  return {
    name: 'raw',
    setup(build) {
      build.onResolve({ filter: /^raw:/ }, (args) => {
        const realPath = args.path.replace(/^raw:/, '');

        return {
          path: path.resolve(args.resolveDir, realPath),
          namespace: '_raw',
        };
      });

      build.onLoad({ filter: /.*/, namespace: '_raw' }, async (args) => {
        const contents = await fs.promises.readFile(args.path.replace(/\?.*$/, ''));

        return {
          contents: contents.toString(),
          loader: 'text',
        };
      });
    },
  };
};
