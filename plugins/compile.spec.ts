import test from 'ava';
import path from 'path';
import vm from 'vm';
import { build } from 'esbuild';
import { wasm } from './wasm/src';
import { less } from './less/src';
test('less', async (t) => {
  const result = await build({
    entryPoints: [path.join(__dirname, './fixtures/less/index.ts')],
    plugins: [less()],
    outdir: path.join(__dirname, './fixtures/less/output'),
    write: true,
    bundle: true,
  });
  t.pass();
});
test('simple wasm', async (t) => {
  const result = await build({
    entryPoints: [path.join(__dirname, './wasm/test/fixtures/index.ts')],
    plugins: [wasm()],
    bundle: true,
    format: 'cjs',
    outfile: path.join(__dirname, './wasm/test/fixtures/bundle.js'),
    write: false,
  });
  for (const x of result.outputFiles) {
    const context = {};
    vm.createContext(context);
    const code = x.text;
    const result = await vm.runInContext(code, context);
    t.is(result, 3);
  }
});
