import type { Plugin } from 'rollup';
import { Compiler } from '../lib/compiler';

export const watchPlugin = (): Plugin => {
  return {
    name: 'watch-file',
    load(id) {
      this.addWatchFile(id);
      return undefined;
    },
  };
};
