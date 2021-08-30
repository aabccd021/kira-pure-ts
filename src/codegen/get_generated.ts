import { DEntry, DEntryT, Num } from '../domain/mod';
import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, Dict, O, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef, TypeDefT, TypeStr } from './domain/mod.g';

function domainToStr(dir: Dict<DirEntT<TypeDefT>>): Dict<DirEntT<string>> {
  return _(dir)
    ._(
      D.mapValues(
        DirEnt.matchSome({
          File: (content) =>
            _(content)
              ._(TypeDef.toTypeStr)
              ._(TypeStr.toCreateFnStr)
              ._(DirEnt.File.create)
              ._v(),
        })
      )
    )
    ._(D.compactOption)
    ._v();
}

function generateDomain(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
  return _(dir)
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
                          ._(TypeDef.createFromCodeStr({ fileName: entry.key }))
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
    ._(D.fromEntries)
    ._(domainToStr)
    ._(D.toEntries)
    ._(
      A.appendReduced((entries) =>
        _(entries)
          ._(
            A.map((entry) =>
              _(entry.key)
                ._(Str.split('.'))
                ._(A.lookup(0))
                ._(O.getSomeOrElse(() => ''))
                ._v()
            )
          )
          ._((entries) =>
            _(A.createEmpty<string>())
              ._(
                A.extend(
                  _(entries)
                    ._(
                      A.map((name) =>
                        _('import {')
                          ._(Str.append(Str.snakeToPascal(name)))
                          ._(Str.append("T } from './"))
                          ._(Str.append(name))
                          ._(Str.append("';"))
                          ._v()
                      )
                    )
                    ._v()
                )
              )
              ._(
                A.extend(
                  _(entries)
                    ._(
                      A.map((name) =>
                        _('export * as ')
                          ._(Str.append(Str.snakeToPascal(name)))
                          ._(Str.append(" from './"))
                          ._(Str.append(name))
                          ._(Str.append("';"))
                          ._v()
                      )
                    )
                    ._v()
                )
              )
              ._(
                A.extend(
                  _(entries)
                    ._(
                      A.map((name) =>
                        _(name)
                          ._(Str.snakeToPascal)
                          ._(Str.snakeToPascal)
                          ._((name) =>
                            _(Str.snakeToPascal(name))._(Str.append('T,'))._v()
                          )
                          ._v()
                      )
                    )
                    ._(A.prepend('export type {'))
                    ._(A.append('};'))
                    ._v()
                )
              )
              ._(Str.fromArr(''))
              ._(DirEnt.File.create)
              ._(DEntry.createFromValue({ key: 'mod.g.ts' }))
              ._v()
          )
          ._v()
      )
    )
    ._(D.fromEntries)
    ._v();
}

export function generateDir(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
  return _(dir)
    ._(
      D.mapValues((ent, name) =>
        _(ent)
          ._(
            DirEnt.mapSome({
              Dir: DirEnt.Dir.copy({
                child: name === 'domain' ? generateDomain : generateDir,
              }),
            })
          )
          ._v()
      )
    )
    ._(D.compactOption)
    ._v();
}
