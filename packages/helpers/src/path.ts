import path from 'path';
export function ensureAbsolutePath(filepath: string, cwd: string): string {
  return path.isAbsolute(filepath) ? filepath : path.join(cwd, filepath);
}
