import test from 'ava';
import path from 'path';
import { build, BuildIncremental, BuildResult } from 'esbuild';
import { wasm } from '../src/index';

test('simple wasm', async (t) => {
  const result = await build({
    entryPoints: [path.join(__dirname, './fixtures/index.ts')],
    plugins: [wasm()],
    bundle: true,
    outfile: path.join(__dirname, './fixtures/bundle.js'),
    write: true,
  });

  t.pass();
});
