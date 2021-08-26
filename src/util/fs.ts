import * as fs from 'fs';
import { _, D, Dict, Either, O, Option, T, Task, TaskEither } from 'kira-pure';

import * as A from './arr';
// eslint-disable-next-line import/no-cycle
import { DT, OT, TO } from '../mod';

export type Dir = {
  readonly _type: 'directory';
  // eslint-disable-next-line no-use-before-define
  readonly child: Option<Dict<DirEnt>>;
};

// eslint-disable-next-line no-use-before-define
function dirFrom(child: Option<Dict<DirEnt>>): Dir {
  return {
    _type: 'directory',
    child,
  };
}

export type File = {
  readonly _type: 'file';
  readonly content: string;
};

function file(content: string): File {
  return { _type: 'file', content };
}

export type EtcDirEnt = {
  readonly _type: 'etc';
};

function etcDirEnt(): EtcDirEnt {
  return { _type: 'etc' };
}

export type DirEnt = Dir | File | EtcDirEnt;

export type DirEntType = 'directory' | 'file' | 'etc';

export function tFrom<T>(t: () => Promise<T>): Task<T> {
  return t;
}

export function teFrom<L, R>(e: () => Promise<Either<L, R>>): TaskEither<L, R> {
  return e;
}

export function readDir(path: string): Task<Option<Dict<DirEntType>>> {
  return _(
    tFrom(() =>
      fs.promises
        .readdir(path, { withFileTypes: true })
        .then((val) => O.some(val))
        .catch(() => O.none)
    )
  )
    ._(
      TO.map((entities) =>
        _(entities)
          ._(
            A.map((ent) =>
              _<DirEntType>(ent.isDirectory() ? 'directory' : ent.isFile() ? 'file' : 'etc')
                ._(D.createEntry(ent.name))
                ._v()
            )
          )
          ._(D.fromEntry)
          ._v()
      )
    )
    ._v();
}

export function readDirRecursive(dir: string): Task<Option<Dict<DirEnt>>> {
  return _(dir)
    ._(readDir)
    ._(
      T.chain((d) =>
        _(d)
          ._(
            O.map((d) =>
              _(d)
                ._(
                  D.mapValues((entType, name) =>
                    _(`${dir}/${name}`)
                      ._<Task<DirEnt>>((path) =>
                        entType === 'directory'
                          ? _(path)._(readDirRecursive)._(T.map(dirFrom))._v()
                          : T.task(etcDirEnt())
                      )
                      ._v()
                  )
                )
                ._(DT.swap)
                ._v()
            )
          )
          ._(OT.swap)
          ._v()
      )
    )
    ._v();
  // return () => {
  //   // eslint-disable-next-line functional/no-try-statement
  //   try {
  //     return {};
  //     fs.readdirSync(dir, { withFileTypes: true }).map((d) => ({
  //       _type: d.isDirectory() ? 'directory' : d.isFile() ? 'file' : 'unknown',
  //       name: d.name,
  //     }));
  //   } catch (e) {
  //     return {};
  //   }
  // };
}

// function lowerFirst(string: string): string {
//   const [f, ...rest] = string;
//   return [f?.toLowerCase(), ...rest].join('');
// }

// function readFile(path: string): IO<string> {
//   return () => fs.readFileSync(path, { encoding: 'utf-8' });
// }

// function writeFile(path: string): (content: string) => IO<void> {
//   return (content) => () => fs.writeFileSync(path, content);
// }
