import { Plugin } from 'esbuild';
import { fetchPkg } from './http';
export const UnpkgNamepsace = 'unpkg';
export const UnpkgHost = 'https://unpkg.com/';
export const pluginUnpkg = (): Plugin => {
  const cache: Record<string, { url: string; content: string }> = {};
  return {
    name: 'unpkg',
    setup(build) {
      build.onLoad({ namespace: UnpkgNamepsace, filter: /.*/ }, async (args) => {
        const pathUrl = new URL(args.path, args.pluginData.parentUrl).toString();
        let value = cache[pathUrl];
        if (!value) {
          value = await fetchPkg(pathUrl);
        }
        cache[pathUrl] = value;
        return {
          contents: value.content,
          pluginData: {
            parentUrl: value.url,
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
