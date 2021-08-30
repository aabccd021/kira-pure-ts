import { DEntry, DEntryT, Num } from '../domain/mod';
import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, Dict, O, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef, TypeDefT } from './domain/mod.g';

function generateTypeWithFileName(
  fileName: string
): (code: string) => TypeDefT {
  return (code) =>
    _(code)
      ._(Str.split('export '))
      ._(A.filter(Str.startsWith('type __')))
      ._(A.lookup(0))
      ._(O.getSomeOrElse(() => ''))
      ._(TypeDef.createFromStrWithFileName(fileName))
      ._v();
}

function generateDomain(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
  _(dir)
    ._(D.toEntries)
    ._(
      A.map((entry) =>
        _(entry.value)
          ._(
            DirEnt.matchSomeToOption<string, DEntryT<DirEntT<TypeDefT>>>({
              File: (content) =>
                entry.key === 'mod.ts' ||
                _(entry.key)._(Str.split('.'))._(A.length)._(Num.lt(2))._v()
                  ? O.None.createAsOption()
                  : _(
                      DEntry.create({
                        key: _(entry.key)
                          ._(Str.split('.'))
                          ._(A.replace(1, Str.prepend('g.')))
                          ._(Str.fromArr('.'))
                          ._v(),
                        value: _(content)
                          ._(generateTypeWithFileName(entry.key))
                          ._(DirEnt.File.create)
                          ._v(),
                      })
                    )
                      ._(O.Some.createAsOption)
                      ._v(),
            })
          )
          ._v()
      )
    )
    ._(A.compactOption)
    ._(
      A.appendReduced((_) =>
        DEntry.create({
          key: 'mod.g.ts',
          value: DirEnt.File.create(''),
        })
      )
    )
    ._(
      A.map((entry) =>
        _(entry.value)
          ._(
            DirEnt.matchSome<TypeDefT, DEntryT<DirEntT<string>>>({
              File: () =>
                _(
                  DEntry.create({
                    key: _(entry.key)
                      ._(Str.split('.'))
                      ._(A.replace(1, Str.prepend('g.')))
                      ._(Str.fromArr('.'))
                      ._v(),
                    value: DirEnt.File.create(''),
                  })
                )._v(),
            })
          )
          ._v()
      )
    )
    ._(A.compactOption)
    ._(D.fromEntries)
    ._v();
}

export function generateDir(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
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
                  ._(O.Some.createAsOption)
                  ._v(),
              fallback: () => O.None.createAsOption<DirEntT<string>>(),
            })
          )
          ._v()
      )
    )
    ._(D.compactOption)
    ._v();
}
