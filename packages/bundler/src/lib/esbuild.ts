import { BuildOptions, BuildResult, Service, TransformOptions, TransformResult } from 'esbuild';
import { version } from 'esbuild-wasm/package.json';
const getService = async (): Promise<Service> => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const esbuild = require('esbuild-wasm/esm/browser');

  const service = await esbuild.startService({
    worker: true,
    wasmURL: `https://unpkg.com/esbuild-wasm@${version}/esbuild.wasm`,
  });
  return service;
};

const wasmBuild = async (options: BuildOptions): Promise<BuildResult> => {
  const service = await getService();
  try {
    return service.build(options);
  } finally {
    //service.stop();
  }
};

const wasmTransform = async (input: string, options: TransformOptions): Promise<TransformResult> => {
  const service = await getService();
  try {
    return service.transform(input, options);
  } finally {
    // service.stop();
  }
};

const build: typeof import('esbuild').build = __NODE__ ? require('esbuild').build : wasmBuild;

const transform: typeof import('esbuild').transform = __NODE__ ? require('esbuild').transform : wasmTransform;

export { build, transform };
