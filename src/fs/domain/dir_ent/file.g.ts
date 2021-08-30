import { FileT } from './mod';

export function create(content: string): FileT {
  return { _type: 'File', content };
}

export function createAsDirEnt(content: string): FileT {
  return { _type: 'File', content };
}

export type Fn<T> = (dir: FileT) => T;

export function copy({
  content,
}: {
  readonly content?: (c: string) => string;
}): Fn<FileT> {
  return (dir) => ({
    _type: 'File',
    content: content?.(dir.content) ?? dir.content,
  });
}
