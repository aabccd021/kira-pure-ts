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

export function map<TResult>(
  onDir: (dir: DirT) => TResult,
  onEtc: (etc: EtcT) => TResult,
  onFile: (file: FileT) => TResult
): Fn<TResult> {
  return (dirEnt) =>
    dirEnt._type === 'Dir'
      ? onDir(dirEnt)
      : dirEnt._type === 'Etc'
      ? onEtc(dirEnt)
      : dirEnt._type === 'File'
      ? onFile(dirEnt)
      : absurd(dirEnt);
}

export function match<TResult>(
  onDir: (child: Dict<DirEntT>) => TResult,
  onEtc: () => TResult,
  onFile: (content: string) => TResult
): Fn<TResult> {
  return map(
    (dir) => onDir(dir.child),
    onEtc,
    (file) => onFile(file.content)
  );
}
