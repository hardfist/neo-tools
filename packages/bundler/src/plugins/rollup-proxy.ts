import type { Plugin } from 'rollup';
import { Plugin as EsbuildPlugin } from 'esbuild';
import { Compiler } from '../lib/compiler';
export const rollupProxyPlugin = (plugins: Plugin[], context: Compiler): EsbuildPlugin => ({
  name: 'rollup-proxy',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      for (const plugin of plugins) {
        const result = plugin?.resolveId?.call(context as any, args.path, args.importer, {});
        if (result == null) {
          continue;
        }
        if (typeof result === 'string') {
          return {
            path: result,
            namespace: 'file',
          };
        }
        if (typeof result === 'object') {
          return {
            path: (result as any).id,
            external: (result as any).external,
          };
        }
      }
    });
    build.onLoad({ filter: /.*/, namespace: 'file' }, async (args) => {
      for (const plugin of plugins) {
        const result = await plugin?.load?.call(context as any, args.path);
        if (result == null) {
          continue;
        }

        if (typeof result !== 'string') {
          throw new Error('暂时不支持load返回其他结果');
        }
        return {
          contents: result,
          loader: 'js',
        };
      }
    });
  },
});
