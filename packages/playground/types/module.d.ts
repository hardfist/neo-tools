declare module '*.svg';
declare module 'path-browserify' {
  import path from 'path';
  export = path;
}
declare module 'worker:.*' {
  function worker(): Worker;
  export default worker;
}
