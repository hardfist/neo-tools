import { Plugin } from 'esbuild';
import * as esbuild from 'esbuild';
import path from 'path';
export const pluginWorker = (): Plugin => ({
  name: 'worker',
  setup(build) {
    build.onResolve({ filter: /^worker:/ }, (args) => {
      const realPath = args.path.replace(/^worker:/, '');
      return {
        path: path.resolve(args.resolveDir, realPath),
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
});
