import { Plugin } from 'esbuild';
import fetch from 'node-fetch';
import url from 'url';

export async function fetchPkg(url: string) {
  const res = await fetch(url);
  return {
    url: res.url,
    content: await res.text(),
  };
}
export const pluginHttp = (): Plugin => {
  return {
    name: 'http',
    setup(build) {
      // 入门的http-url 的virtual module
      build.onResolve({ filter: /^https?:\/\// }, async (args) => {
        return {
          namespace: 'http-url',
          path: args.path,
        };
      });
      process.abort;
      // 非入口的http-url的virtual module
      build.onResolve({ filter: /.*/, namespace: 'http-url' }, async (args) => {
        const path = new url.URL(args.path, args.resolveDir.replace(/^\//, '')).toString();

        return {
          path,
          namespace: 'http-url',
        };
      });
      // 加载http-url
      build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
        const { content, url } = await fetchPkg(args.path);

        return {
          contents: content,
          loader: 'ts',
          resolveDir: `/${url}`, // a hack fix resolveDir problem
        };
      });
    },
  };
};
