import { Plugin } from 'esbuild';
import { Compiler } from '../lib/compiler';
import { UnpkgNamepsace } from './unpkg';
import { UnpkgHost } from './unpkg';
import path from 'path';
export const pluginBareModule = (context: Compiler): Plugin => {
  return {
    name: 'bare',
    setup(build) {
      if (context.options.unpkg) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (/^(?!\.).*/.test(args.path) && !path.isAbsolute(args.path)) {
            if (args.path === 'esbuild' || args.path === '@neo-tools/helpers') {
              return;
            }
            return {
              path: args.path,
              namespace: UnpkgNamepsace,
              pluginData: {
                parentUrl: UnpkgHost,
              },
            };
          }
        });
      }
    },
  };
};
