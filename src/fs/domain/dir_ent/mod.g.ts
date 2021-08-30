import { O, Option } from '../../../domain/mod';
import { absurd, Dict } from '../../../mod';
import * as Dir from './dir';
import * as Etc from './etc';
import * as File from './file';

export { Dir, Etc, File };

export type DirT<T> = Dir.__<T> & {
  readonly _type: 'Dir';
};

export type EtcT = Etc.__ & {
  readonly _type: 'Etc';
};

export type FileT<T> = File.__<T> & {
  readonly _type: 'File';
};

export type DirEntT<T> = FileT<T> | DirT<T> | EtcT;

export type Fn<T, TResult> = (dirEnt: DirEntT<T>) => TResult;

export function map<T, TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir: (dir: DirT<T>) => TResult;
  readonly Etc: (etc: EtcT) => TResult;
  readonly File: (file: FileT<T>) => TResult;
}): Fn<T, TResult> {
  return (dirEnt) =>
    dirEnt._type === 'Dir'
      ? Dir(dirEnt)
      : dirEnt._type === 'Etc'
      ? Etc(dirEnt)
      : dirEnt._type === 'File'
      ? File(dirEnt)
      : absurd(dirEnt);
}

export function mapElse<T, TResult>({
  Dir,
  Etc,
  File,
  fallback,
}: {
  readonly Dir?: (dir: DirT<T>) => TResult;
  readonly Etc?: (etc: EtcT) => TResult;
  readonly File?: (file: FileT<T>) => TResult;
  readonly fallback: () => TResult;
}): Fn<T, TResult> {
  return map({
    Dir: Dir ?? fallback,
    Etc: Etc ?? fallback,
    File: File ?? fallback,
  });
}

export function match<T, TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir: (child: Dict<DirEntT<T>>) => TResult;
  readonly Etc: () => TResult;
  readonly File: (content: T) => TResult;
}): Fn<T, TResult> {
  return map({
    Dir: (dir) => Dir(dir.child),
    Etc,
    File: (file) => File(file.content),
  });
}

export function matchElse<T, TResult>({
  Dir,
  Etc,
  File,
  fallback,
}: {
  readonly Dir?: (child: Dict<DirEntT<T>>) => TResult;
  readonly Etc?: () => TResult;
  readonly File?: (content: T) => TResult;
  readonly fallback: () => TResult;
}): Fn<T, TResult> {
  return match({
    Dir: Dir ?? fallback,
    Etc: Etc ?? fallback,
    File: File ?? fallback,
  });
}

export function matchSome<T, TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir?: (child: Dict<DirEntT<T>>) => NonNullable<TResult>;
  readonly Etc?: () => NonNullable<TResult>;
  readonly File?: (content: T) => NonNullable<TResult>;
}): Fn<T, Option<TResult>> {
  return match({
    Dir: (x) => O.fromNullable(Dir?.(x)),
    Etc: () => O.fromNullable(Etc?.()),
    File: (x) => O.fromNullable(File?.(x)),
  });
}

export function matchSomeToOption<T, TResult>({
  Dir,
  Etc,
  File,
}: {
  readonly Dir?: (child: Dict<DirEntT<T>>) => Option<TResult>;
  readonly Etc?: () => Option<TResult>;
  readonly File?: (content: T) => Option<TResult>;
}): Fn<T, Option<TResult>> {
  return match({
    Dir: Dir ?? O.None.create,
    Etc: Etc ?? O.None.create,
    File: File ?? O.None.create,
  });
}
