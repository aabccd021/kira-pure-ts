import { D, Dict, Str, T, Task } from '../mod';
import { _ } from '../ts/pipe';
import { DirEnt, DirEntT } from './domain/mod.g';
import { writeFileWithPath } from './write_file';

export function writeDir(dir: Dict<DirEntT<string>>, path: string): Task<void> {
  return _(dir)
    ._(
      D.mapValues((ent, name) =>
        _(path)
          ._(Str.append('/'))
          ._(Str.append(name))
          ._((entPath) =>
            _(ent)
              ._(
                DirEnt.match({
                  // eslint-disable-next-line no-use-before-define
                  Dir: writeDirWithPath(entPath),
                  Etc: T.createEmpty,
                  File: writeFileWithPath(entPath),
                })
              )
              ._v()
          )
          ._v()
      )
    )
    ._(D.swapTask)
    ._(T.match(D.compactVoid))
    ._v();
}

export function writeDirWithPath(
  path: string
): (dir: Dict<DirEntT<string>>) => Task<void> {
  return (dir) => writeDir(dir, path);
}
