import { Plugin } from 'esbuild';
import postcss from 'postcss';
import fse from 'fs-extra';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export const pluginPostcss = (): Plugin => ({
  name: 'postcss',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const content = (await fse.readFile(args.path)).toString();
      const result = await postcss(tailwindcss, autoprefixer).process(content, { from: undefined });
      return {
        contents: result.css,
        loader: 'css',
      };
    });
  },
});
