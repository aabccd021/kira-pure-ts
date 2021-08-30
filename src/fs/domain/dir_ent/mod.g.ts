import { absurd, Dict } from '../../../mod';
import * as Dir from './dir';
import * as Etc from './etc';
import * as File from './file';

export { Dir, Etc, File };

export type DirT = Dir.__ & {
  readonly _type: 'Dir';
};

export type EtcT = Etc.__ & {
  readonly _type: 'Etc';
};

export type FileT = File.__ & {
  readonly _type: 'File';
};

export type DirEntT = FileT | DirT | EtcT;

export type Fn<TResult> = (dirEnt: DirEntT) => TResult;

export function map<TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir: (dir: DirT) => TResult;
  readonly Etc: (etc: EtcT) => TResult;
  readonly File: (file: FileT) => TResult;
}): Fn<TResult> {
  return (dirEnt) =>
    dirEnt._type === 'Dir'
      ? Dir(dirEnt)
      : dirEnt._type === 'Etc'
      ? Etc(dirEnt)
      : dirEnt._type === 'File'
      ? File(dirEnt)
      : absurd(dirEnt);
}

export function mapElse<TResult>({
  Dir,
  Etc,
  File,
  fallback,
}: {
  readonly Dir?: (dir: DirT) => TResult;
  readonly Etc?: (etc: EtcT) => TResult;
  readonly File?: (file: FileT) => TResult;
  readonly fallback: () => TResult;
}): Fn<TResult> {
  return map({
    Dir: Dir ?? fallback,
    Etc: Etc ?? fallback,
    File: File ?? fallback,
  });
}

export function match<TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir: (child: Dict<DirEntT>) => TResult;
  readonly Etc: () => TResult;
  readonly File: (content: string) => TResult;
}): Fn<TResult> {
  return map({
    Dir: (dir) => Dir(dir.child),
    Etc,
    File: (file) => File(file.content),
  });
}

export function matchElse<TResult>({
  Dir,
  Etc,
  File,
  fallback,
}: {
  readonly Dir?: (child: Dict<DirEntT>) => TResult;
  readonly Etc?: () => TResult;
  readonly File?: (content: string) => TResult;
  readonly fallback: () => TResult;
}): Fn<TResult> {
  return match({
    Dir: Dir ?? fallback,
    Etc: Etc ?? fallback,
    File: File ?? fallback,
  });
}
