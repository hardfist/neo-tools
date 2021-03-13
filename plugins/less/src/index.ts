import type { Plugin } from 'esbuild';
import fs from 'fs';
import { render } from 'less';
export const less = (): Plugin => {
  return {
    name: 'less',
    setup(build) {
      build.onLoad({ filter: /\.less$/ }, async (args) => {
        const content = await fs.promises.readFile(args.path);
        const result = await render(content.toString());
        return {
          contents: result.css,
          loader: 'css',
        };
      });
    },
  };
};
