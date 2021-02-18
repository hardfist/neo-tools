import test from 'ava';
import path from 'path';
import vm from 'vm';
import { build } from 'esbuild';
import { wasm } from '../src/index';

test('simple wasm', async (t) => {
  const result = await build({
    entryPoints: [path.join(__dirname, './fixtures/index.ts')],
    plugins: [wasm()],
    bundle: true,
    format: 'cjs',
    outfile: path.join(__dirname, './fixtures/bundle.js'),
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
