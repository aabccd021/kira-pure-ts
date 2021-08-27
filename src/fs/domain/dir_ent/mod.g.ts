import * as Dir from './dir';
import * as Etc from './etc';
import * as File from './file';

export { Dir, Etc, File };

export type FileT = File.__ & {
  readonly _type: 'File';
};

export type DirT = Dir.__ & {
  readonly _type: 'Dir';
};

export type EtcT = Etc.__ & {
  readonly _type: 'Etc';
};

export type DirEntT = FileT | DirT | EtcT;

export type Fn<TResult> = (dirEnt: DirEntT) => TResult;

export function map<TResult>(
  onFile: (content: string) => TResult,
  onDir: (content: string) => TResult,
  onEtc: (content: string) => TResult
): ;
