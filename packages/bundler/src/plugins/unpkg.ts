import { Plugin } from 'esbuild';
import { fetchPkg } from './http';
export const UnpkgNamepsace = 'unpkg';
export const UnpkgHost = 'https://unpkg.com/';

export const pluginUnpkg = (): Plugin => {
  return {
    name: 'unpkg',
    setup(build) {
      build.onLoad({ namespace: UnpkgNamepsace, filter: /.*/ }, async (args) => {
        const pathUrl = new URL(args.path, args.pluginData.parentUrl).toString();
        const { url, content } = await fetchPkg(pathUrl);
        return {
          contents: content,
          pluginData: {
            parentUrl: url,
          },
        };
      });
      build.onResolve({ namespace: UnpkgNamepsace, filter: /.*/ }, async (args) => {
        return {
          namespace: UnpkgNamepsace,
          path: args.path,
          pluginData: args.pluginData,
        };
      });
    },
  };
};
