/* eslint-disable @typescript-eslint/no-var-requires */
import { Compiler } from './lib/compiler';
import Defer from 'p-defer';
import { yargsBuildOptions } from './lib/yargsOptions';
import fs from 'fs';
import memfs from 'memfs';
import path from 'path';
import { FileSystem } from './types';
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

export function compileMemfs(json: Record<string, any>, input: string) {
  const defer = pDefer<Record<string, string>>();
  memfs.vol.fromJSON(json, '/');
  const result = new Compiler({
    memfs: true,
    fileSystem: (memfs as any) as FileSystem,
    cwd: process.cwd(),
    output: 'bundle.js',
    input: input ?? 'src/index.js',
    unpkg: true,
    http: false,
    plugins: [],
    hooks: {
      done(result) {
        const compileResult = {} as Record<string, string>;
        result?.outputFiles?.forEach((x) => {
          compileResult[x.path] = x.text;
        });
        defer.resolve(compileResult);
      },
    },
  }).build();
  return defer.promise;
}
export { Compiler, memfs };
