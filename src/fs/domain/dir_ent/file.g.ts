import { FileT } from './mod';

export function create<T>(content: T): FileT<T> {
  return { _type: 'File', content };
}

export function createAsDirEnt<T>(content: T): FileT<T> {
  return { _type: 'File', content };
}

export type Fn<T, TResult> = (dir: FileT<T>) => TResult;

export function copy<T>({
  content,
}: {
  readonly content?: (c: T) => T;
}): Fn<T, FileT<T>> {
  return (dir) => ({
    _type: 'File',
    content: content?.(dir.content) ?? dir.content,
  });
}
