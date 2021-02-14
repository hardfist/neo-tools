/* eslint-disable */
require('source-map-support/register');
const bundler = require('@neotools/bundler');
const path = require('path');
const memfs = require('memfs');
const fs = require('fs');
const json = {
  'src/index.js': fs.readFileSync(path.join(__dirname, './src/index.js')).toString(),
  'src/lib.js': fs.readFileSync(path.join(__dirname, './src/lib.js')).toString(),
};
memfs.vol.fromJSON(json, '/');
console.log('memfs:', memfs.vol.toJSON());

async function main() {
  const result = new bundler.Compiler({
    memfs: false,
    fileSystem: memfs,
    cwd: process.cwd(),
    output: 'dist/bundle.js',
    input: 'src/index.js',
    hooks: {
      done(result) {
        result?.outputFiles?.forEach((x) => {
          console.log(`${x.path}:${x.text}`);
        });
      },
    },
  }).build();
}
main();
