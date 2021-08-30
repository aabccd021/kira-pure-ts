import { DEntry } from '../domain/mod';
import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, DEntryT, Dict, Num, O, Option, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef, TypeStr } from './domain/mod.g';

function generateTypeWithFileName(fileName: string): (code: string) => string {
  return (code) =>
    _(code)
      ._(Str.split('export '))
      ._(A.filter(Str.startsWith('type __')))
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
            DirEnt.matchElse<Option<DEntryT<DirEntT>>>({
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
                      ._(O.Some.asOptionFrom)
                      ._v(),
              fallback: () => O.None.createAsOption(),
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
    ._(D.fromEntries)
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
              fallback: () => O.None.createAsOption<DirEntT>(),
            })
          )
          ._v()
      )
    )
    ._(D.compactOption)
    ._v();
}
