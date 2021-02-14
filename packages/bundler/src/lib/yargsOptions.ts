import type { Argv } from 'yargs';
import type { Format, Platform } from 'esbuild';
export function yargsBuildOptions(yargs: Argv) {
  return yargs
    .positional('input', {
      type: 'string',
      default: '.',
      describe: 'source file',
    })
    .positional('output', {
      type: 'string',
      default: 'bundle.js',
      describe: 'output file',
    })
    .option('unpkg', {
      type: 'boolean',
      default: false,
      describe: 'unpkg',
    })
    .option('memfs', {
      type: 'boolean',
      default: false,
      describe: 'memfs',
    })
    .option('http', {
      type: 'boolean',
      default: false,
      describe: 'http',
    })
    .option('platform', {
      type: 'string',
      default: 'node' as Platform,
      description: 'platform',
    })
    .option('format', {
      type: 'string',
      default: 'cjs' as Format,
      description: 'format',
      choices: ['iife', 'cjs', 'esm'],
    });
}
