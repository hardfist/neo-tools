import { Plugin } from 'esbuild';
export const pluginDebug = (): Plugin => {
  return {
    name: 'debug',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        console.log('debug resolve:', args);
        return undefined;
      });
      build.onLoad({ filter: /.*/ }, (args) => {
        console.log('debug load', args);
        return undefined;
      });
    },
  };
};
