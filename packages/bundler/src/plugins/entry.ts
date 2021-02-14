import type { Plugin } from 'esbuild';
import { Compiler } from '../lib/compiler';
import { MemfsNamespace } from './memfs';
export const pluginEntry = (context: Compiler): Plugin => {
  return {
    name: 'virtual-entry',
    setup(build) {
      build.onResolve({ filter: /^<stdin>$/ }, (args) => {
        return {
          path: context.options.input,
          namespace: context.options.memfs ? MemfsNamespace : 'file',
          pluginData: {
            importer: '',
          },
        };
      });
    },
  };
};
