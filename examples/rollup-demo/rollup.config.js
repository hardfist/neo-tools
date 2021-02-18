const rollup = require('rollup');
const util = require('util');
async function main() {
  const bundle = await rollup.rollup({
    input: ['./src/index.js'],
  });
  console.log(util.inspect(bundle.cache?.modules, { colors: true, depth: null }));

  const result = await bundle.generate({
    format: 'cjs',
  });
  console.log('result:', result);
}
main();
