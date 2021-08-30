import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, DEntry, Dict, Num, O, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef, TypeStr } from './domain/mod.g';

function generateTypeWithFileName(fileName: string): (code: string) => string {
  return (code) =>
    _(code)
      ._(Str.split('export '))
      ._(A.filter(Str.startsWith('type')))
      ._(A.lookup(0))
      ._(O.getSomeOrElse(() => ''))
      ._(TypeDef.createFromStrWithFileName(fileName))
      ._(TypeDef.toTypeStr)
      ._(TypeStr.toCreateFnStr)
      ._v();
}

function generateDomain(dir: Dict<DirEntT>): Dict<DirEntT> {
  return _(dir)
    ._(D.toEntries)
    ._(
      A.map((entry) =>
        _(entry.value)
          ._(
            DirEnt.matchElse({
              File: (content) =>
                entry.key === 'mod.ts' ||
                _(entry.key)._(Str.split('.'))._(A.length)._(Num.lt(2))._v()
                  ? DEntry.from({
                      key: entry.key,
                      value: O.None.asOptionFrom<DirEntT>(),
                    })
                  : DEntry.from({
                      key: _(entry.key)
                        ._(Str.split('.'))
                        ._(A.replace(1, Str.prepend('g.')))
                        ._(Str.fromArr('.'))
                        ._v(),
                      value: _(content)
                        ._(
                          generateTypeWithFileName(
                            _(entry.key)
                              ._(Str.split('.'))
                              ._(A.lookup(0))
                              ._(O.getSomeOrElse(() => ''))
                              ._v()
                          )
                        )
                        ._(DirEnt.File.from)
                        ._(O.Some.from)
                        ._v(),
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
    ._(D.fromEntries)
    ._(D.compactOption)
    ._v();
}

export function generateDir(dir: Dict<DirEntT>): Dict<DirEntT> {
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
                      child: name === 'domain' ? generateDomain : generateDir,
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
