import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, DEntry, Dict, O, Str } from '../mod';
import { _ } from '../ts/pipe';

function generateDomain(dir: Dict<DirEntT>): Dict<DirEntT> {
  return _(dir)
    ._(D.toDEntryArr)
    ._(
      A.map((entry) =>
        _(entry.value)
          ._(
            DirEnt.mapElse({
              File: () =>
                entry.key === 'mod.ts'
                  ? DEntry.from({
                      key: entry.key,
                      value: O.None.asOptionFrom<DirEntT>(),
                    })
                  : DEntry.from({
                      key: _(entry.key)
                        ._(Str.split('.'))
                        ._(A.replace(1, Str.prepend('s.')))
                        ._(Str.fromArr('.'))
                        ._v(),
                      value: O.Some.from(
                        DirEnt.File.from('export function _(): void {}')
                      ),
                    }),
              fallback: () =>
                DEntry.from({
                  key: entry.key,
                  value: O.None.asOptionFrom<DirEntT>(),
                }),
            })
          )
          ._v()
      )
    )
    ._(D.fromDEntryArr)
    ._(D.compactOption)
    ._v();
}

export function getGenerated(dir: Dict<DirEntT>): Dict<DirEntT> {
  return _(dir)
    ._(
      D.mapValues((ent, name) =>
        _(ent)
          ._(
            DirEnt.mapElse({
              Dir: (dir) =>
                _(dir)
                  ._(
                    DirEnt.Dir.copy({
                      child: name === 'domain' ? generateDomain : getGenerated,
                    })
                  )
                  ._(O.Some.asOptionFrom)
                  ._v(),
              fallback: () => O.None.asOptionFrom<DirEntT>(),
            })
          )
          ._v()
      )
    )
    ._(D.compactOption)
    ._v();
}
