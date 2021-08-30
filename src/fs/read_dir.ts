import * as fs from 'fs';

import { _, A, D, DEntry, Dict, O, T, TaskOption, TO } from '../mod';
import { DirEntEnum } from './domain/mod';

/**
 * returns None if error
 */
export function readDir(path: string): TaskOption<Dict<DirEntEnum>> {
  return _(
    T.from(() =>
      fs.promises
        .readdir(path, { withFileTypes: true })
        .then((val) => O.Some.create(val))
        .catch(() => O.None.create())
    )
  )
    ._(
      TO.match((entities) =>
        _(entities)
          ._(
            A.map((ent) =>
              _<DirEntEnum>(
                ent.isDirectory() ? 'directory' : ent.isFile() ? 'file' : 'etc'
              )
                ._(DEntry.createFromValue({ key: ent.name }))
                ._v()
            )
          )
          ._(D.fromEntries)
          ._v()
      )
    )
    ._v();
}
