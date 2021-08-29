import { _, D, Dict, DirEnt, O, OT, T, Task, TaskOption } from '../mod';
import { DirEntT, readDir } from './mod';

export function readDirRecursive(path: string): TaskOption<Dict<DirEntT>> {
  return _(path)
    ._(readDir)
    ._(
      T.chain((d) =>
        _(d)
          ._(
            O.match((d) =>
              _(d)
                ._(
                  D.mapValues((entType, name) =>
                    _(`${path}/${name}`)
                      ._<Task<DirEntT>>((path) =>
                        entType === 'directory'
                          ? _(path)
                              ._(readDirRecursive)
                              ._(T.match(DirEnt.Dir.from))
                              ._v()
                          : T.fromValue(DirEnt.Etc.from())
                      )
                      ._v()
                  )
                )
                ._(D.swapTask)
                ._v()
            )
          )
          ._(OT.swap)
          ._v()
      )
    )
    ._v();
}
