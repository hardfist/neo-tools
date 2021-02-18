import { build } from '../lib/esbuild';
import { ensureAbsolutePath } from '@neo-tools/helpers';
import type { Plugin, BuildOptions, BuildResult } from 'esbuild';
import { pluginMemfs } from '../plugins/memfs';
import { pluginNodePolyfill } from '../plugins/node-polyfill';
import debounce from 'debounce';
import { pluginBareModule } from '../plugins/bare';
import type chokidar from 'chokidar';
import { CompilerOptions } from '../types';
import { watchPlugin } from '../plugins/watch';
import { rollupProxyPlugin } from '../plugins/rollup-proxy';
import { pluginHttp } from '../plugins/http';
import { pluginUnpkg } from '../plugins/unpkg';
import path from 'path';
import fs from 'fs';
import { pluginEntry } from '../plugins/entry';
import { pluginGlobalExternal } from '../plugins/external-global';
function normalizeOptions(options: CompilerOptions): Required<CompilerOptions> {
  const cwd = options.cwd ?? process.cwd();
  return {
    input: ensureAbsolutePath(options.input, cwd),
    output: ensureAbsolutePath(options.output, cwd),
    fileSystem: options.fileSystem ?? fs,
    unpkg: options.unpkg ?? false,
    watch: options.watch ?? false,
    plugins: options.plugins ?? [],
    hooks: options.hooks ?? {},
    cwd,
    platform: options.platform ?? 'node',
    format: options.format ?? 'cjs',
    memfs: options.memfs ?? false,
    http: options.http ?? false,
  };
}

const defaultEsbuildOptions: BuildOptions = {
  platform: 'node',
  logLevel: 'error',
  bundle: true,
  plugins: [],
  external: ['fsevents'],
};

function normalizeEsbuildOptions(options: BuildOptions) {
  const ret = {
    ...defaultEsbuildOptions,
    ...options,
  };
  return ret;
}

export class Compiler {
  options: Required<CompilerOptions>;
  result: BuildResult | undefined;
  watcher?: chokidar.FSWatcher;
  firstBuildPass = false;
  constructor(options: CompilerOptions) {
    this.options = normalizeOptions(options);
    if (this.options.watch && !this.watcher) {
      this.watcher = require('chokidar').watch([]);
      this.watcher?.on(
        'all',
        debounce(
          () => {
            if (this.firstBuildPass) {
              this.build(false);
            }
          },
          500,
          true
        )
      );
    }
  }
  addWatchFile(id: string) {
    this.watcher?.add(id);
  }
  async build(watch = false) {
    const context = this;
    this.options.hooks?.start?.();
    try {
      const context = this;
      if (this.result) {
        this.result = await this.result?.rebuild?.();
      } else {
        const plugins = [watchPlugin(), ...this.options.plugins];
        const result = await build(
          normalizeEsbuildOptions({
            entryPoints: ['<stdin>'],
            incremental: true,
            logLevel: 'error',
            write: !context.options.memfs,
            outfile: this.options.output,
            format: context.options.format,
            globalName: 'bundler',
            define: {
              __NODE__: JSON.stringify(context.options.platform === 'node'),
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            },
            external:
              this.options.platform === 'node' ? ['esbuild', 'fsevents'] : ['esbuild', 'fsevents', 'chokidar', 'yargs'],
            platform: this.options.platform,
            banner: this.options.platform === 'browser' ? 'global = globalThis' : '',
            inject: this.options.platform === 'node' ? [] : [path.join(__dirname, '../shim/node.js')],
            plugins: [
              context.options.platform === 'browser' && pluginNodePolyfill(),
              context.options.platform === 'browser' && pluginGlobalExternal(),
              pluginEntry(context),
              rollupProxyPlugin(plugins, context),
              pluginBareModule(context),
              context.options.http && pluginHttp(),
              context.options.unpkg && pluginUnpkg(),
              context.options.memfs && pluginMemfs(context),
            ].filter(Boolean) as Plugin[],
          })
        );
        this.result = result;
      }
      if (context.options.memfs) {
        this.result?.outputFiles?.forEach((x) => {
          if (!context.options.fileSystem.existsSync(path.dirname(x.path))) {
            context.options.fileSystem.mkdirSync(path.dirname(x.path));
          }
          context.options.fileSystem.writeFileSync(x.path, x.text);
        });
      }
      // this.hooks.done.promise(this.result);
      this.options?.hooks?.done?.(this.result!);
    } finally {
      this.firstBuildPass = true;
    }
  }
}
