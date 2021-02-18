import sample from './sample.wasm';

(async () => {
  const sample_module = await sample();
  const result = sample_module.main();
  return result;
})();
