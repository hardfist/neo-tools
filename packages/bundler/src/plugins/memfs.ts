import { Plugin } from 'esbuild';
import { Compiler } from '..';
import path from 'path';
import { FileSystem } from '../types';
export const MemfsNamespace = 'memfsNZ';
function resolve({ id, importer, fs }: { id: string; importer: string; fs: FileSystem }) {
  let resolvedPath = id;
  if (importer && id.startsWith('.')) {
    resolvedPath = path.resolve(path.dirname(importer), id);
  }
  for (const x of ['', '.ts', '.js', '.css']) {
    const realPath = resolvedPath + x;
    if (fs.existsSync(realPath)) {
      return realPath;
    }
  }
  throw new Error(`${resolvedPath} not exists`);
}
export const pluginMemfs = (context: Compiler): Plugin => {
  return {
    name: 'memfs-plugin',
    setup(build) {
      build.onResolve({ filter: /.*/, namespace: MemfsNamespace }, (args) => {
        return {
          path: args.path,
          pluginData: args.pluginData,
          namespace: MemfsNamespace,
        };
      });
      build.onLoad({ filter: /.*/, namespace: MemfsNamespace }, async (args) => {
        let realPath = args.path;
        const resolvePath = resolve({
          id: args.path,
          importer: args.pluginData.importer,
          fs: context.options.fileSystem,
        });
        if (!resolvePath) {
          throw new Error('not found');
        }
        realPath = resolvePath;
        const content = (await context.options.fileSystem.promises.readFile(realPath)).toString();
        return {
          contents: content,
          pluginData: {
            importer: realPath,
          },
          loader: path.extname(realPath).slice(1) as 'js',
        };
      });
    },
  };
};
