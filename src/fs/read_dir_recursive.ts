import { _, D, Dict, Str, T, TaskOption, TO } from '../mod';
import { DirEnt, DirEntT, readDir } from './mod';
import { readFile } from './read_file';

export function readDirRecursive(
  path: string
): TaskOption<Dict<DirEntT<string>>> {
  return _(path)
    ._(readDir)
    ._(
      TO.chainTask((d) =>
        _(d)
          ._(
            D.mapValues((entType, name) =>
              _(path)
                ._(Str.append('/'))
                ._(Str.append(name))
                ._((dirEntPath) =>
                  entType === 'directory'
                    ? _(dirEntPath)
                        ._(readDirRecursive)
                        ._(TO.match(DirEnt.Dir.createAsDirEnt))
                        ._v()
                    : entType === 'file'
                    ? _(dirEntPath)
                        ._(readFile)
                        ._(TO.match(DirEnt.File.createAsDirEnt))
                        ._v()
                    : TO.someFrom(DirEnt.Etc.createAsDirEnt<string>())
                )
                ._v()
            )
          )
          ._(D.swapTask)
          ._(T.match(D.compactOption))
          ._v()
      )
    )
    ._v();
}
