import { Dict, Option } from '../../../domain/mod';
import { absurd } from '../../../ts/absurd';
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

export function m<TResult>(
  onDir: (child: Option<Dict<DirEntT>>) => TResult,
  onFile: (content: string) => TResult,
  onEtc: () => TResult
): Fn<TResult> {
  return (dirEnt) =>
    dirEnt._type === 'Dir'
      ? onDir(dirEnt.child)
      : dirEnt._type === 'Etc'
      ? onEtc()
      : dirEnt._type === 'File'
      ? onFile(dirEnt.content)
      : absurd(dirEnt);
}
