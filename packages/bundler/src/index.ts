/* eslint-disable @typescript-eslint/no-var-requires */
import { Compiler } from './lib/compiler';
import Defer from 'p-defer';
import { yargsBuildOptions } from './lib/yargsOptions';
import fs from 'fs';
import memfs from 'memfs';
import path from 'path';
import { CompilerOptions, FileSystem } from './types';
import pDefer from 'p-defer';
export async function run() {
  const yargs = await import('yargs');
  yargs
    .scriptName('neo-bundler')
    .usage('$0 <cmd> [args]')
    .command(
      'bundle <input> <output>',
      'output a single Javascript file with all dependencies\n neo-bundler bundle ',
      yargsBuildOptions,
      async (args) => {
        const compiler = new Compiler({
          ...args,
          plugins: [],
          watch: false,
          fileSystem: fs,
        });
        const result = await compiler.build();
      }
    )
    .command('watch <input> <output>', 'watch build', yargsBuildOptions, async (args) => {
      const compiler = new Compiler({
        ...args,
        plugins: [],
        watch: true,
        fileSystem: fs,
        hooks: {
          start() {
            console.log('start compile');
          },
          done(result) {
            console.log('finish compile');
          },
        },
      });
      await compiler.build();
    })
    .demandCommand(1, '')
    .recommendCommands()
    .strict()
    .help().argv;
}

export function compileMemfs(json: Record<string, any>, options: CompilerOptions) {
  const defer = pDefer<Record<string, string>>();
  memfs.vol.fromJSON(json, '/');
  return new Compiler({
    memfs: true,
    fileSystem: (memfs as any) as FileSystem,
    cwd: process.cwd(),
    output: 'bundle.js',
    input: options.input,
    hooks: options.hooks,
    unpkg: true,
    http: false,
    plugins: [],
  });
}
export { Compiler, memfs };
