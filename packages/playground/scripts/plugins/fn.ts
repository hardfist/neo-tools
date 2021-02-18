import esbuild, { Plugin } from 'esbuild';
import path from 'path';
import fs from 'fs';
import vm from 'vm';
export const pluginFn = (): Plugin => ({
  name: 'fn',
  setup(build) {
    build.onResolve({ filter: /^fn:/ }, (args) => {
      const realPath = args.path.replace(/^fn:/, '');
      const [fnPath, n] = realPath.split('?');
      return {
        namespace: 'fn',
        path: path.resolve(args.resolveDir, fnPath),
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
});
