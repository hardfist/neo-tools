declare module '*.svg';
declare module 'path-browserify' {
  import path from 'path';
  export = path;
}
declare module 'worker:.*' {
  function worker(): Worker;
  export default worker;
}

declare module 'fn:.*' {
  const result: number;
  export default result;
}

declare module 'raw:.*' {
  const result: string;
  export default result;
}

declare module 'glob:*' {
  const result: Record<string, string>;
  export default result;
}

declare module '*.html' {
  const result: string;
  export default result;
}
