import sample from './sample.wasm';
async function main(): Promise<void> {
  const sample_module = await sample();
  console.log(sample_module.main());
}
main();
