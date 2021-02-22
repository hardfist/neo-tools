import { Plugin } from 'esbuild';
import path from 'path';
import glob from 'glob';
import fs from 'fs';
const globReg = /^glob:/;
export const pluginGlob = (): Plugin => {
  return {
    name: 'glob',
    setup(build) {
      build.onResolve({ filter: globReg }, (args) => {
        return {
          path: path.resolve(args.resolveDir, args.path.replace(globReg, '')),
          namespace: 'glob',
          pluginData: {
            resolveDir: args.resolveDir,
          },
        };
      });
      build.onLoad({ filter: /.*/, namespace: 'glob' }, async (args) => {
        const matchPath: string[] = await new Promise((resolve, reject) => {
          glob(
            args.path,
            {
              cwd: args.pluginData.resolveDir,
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
        });
        const result: Record<string, string> = {};
        await Promise.all(
          matchPath.map(async (x) => {
            const contents = await fs.promises.readFile(x);
            result[path.basename(x)] = contents.toString();
          })
        );
        return {
          contents: JSON.stringify(result),
          loader: 'json',
        };
      });
    },
  };
};
