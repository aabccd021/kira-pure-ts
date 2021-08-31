import { DEntry, DEntryT, Num } from '../domain/mod';
import { DirEnt, DirEntT } from '../fs/mod';
import { A, Arr, D, Dict, O, Option, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef, TypeDefT, TypeStr } from './domain/mod.g';

function typeDefToFileEnt(typeDef: TypeDefT): DirEnt.FileT<string> {
  return _(typeDef)
    ._(TypeStr.createFromTypeDef)
    ._(TypeStr.toCompiledStr)
    ._(DirEnt.File.create)
    ._v();
}

function typeNameToModuleExport(name: string): string {
  return _('export * as ')
    ._(Str.append(Str.snakeToPascal(name)))
    ._(Str.append(" from './"))
    ._(Str.append(name))
    ._(Str.append("';"))
    ._v();
}

function typeNameToModuleImport(name: string): string {
  return _('import {')
    ._(Str.append(Str.snakeToPascal(name)))
    ._(Str.append("T } from './"))
    ._(Str.append(name))
    ._(Str.append("';"))
    ._v();
}

function typeNameToExport(name: string): string {
  return _(name)
    ._(Str.snakeToPascal)
    ._(Str.snakeToPascal)
    ._((name) => _(Str.snakeToPascal(name))._(Str.append('T,'))._v())
    ._v();
}

function typeNamesToExport(entries: Arr<string>): Arr<string> {
  return _(entries)
    ._(A.map(typeNameToExport))
    ._(A.prepend('export type {'))
    ._(A.append('};'))
    ._v();
}

function dirEntEntryToKey<T>(entry: DEntryT<DirEntT<T>>): string {
  return _(entry.key)
    ._(Str.split('.'))
    ._(A.lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._v();
}

function typeNamesToModContent(
  names: Arr<string>
): DEntryT<DirEnt.FileT<string>> {
  return _(A.createEmpty<string>())
    ._(A.extend(A.map(typeNameToModuleImport)(names)))
    ._(A.extend(_(names)._(A.map(typeNameToModuleExport))._v()))
    ._(A.extend(typeNamesToExport(names)))
    ._(Str.fromArr(''))
    ._(DirEnt.File.create)
    ._(DEntry.createFromValue({ key: 'mod.g.ts' }))
    ._v();
}

function typesToMod(
  arr: Arr<DEntryT<DirEnt.DirEntT<string>>>
): DEntryT<DirEnt.FileT<string>> {
  return _(arr)._(A.map(dirEntEntryToKey))._(typeNamesToModContent)._v();
}

function fileNameToGenerated(fileName: string): string {
  return _(fileName)
    ._(Str.split('.'))
    ._(A.replace(1, Str.prepend('g.')))
    ._(Str.fromArr('.'))
    ._v();
}

function contentToFile({
  content,
  fileName,
}: {
  readonly content: string;
  readonly fileName: string;
}): DirEnt.FileT<TypeDefT> {
  return _(content)
    ._(TypeDef.createFromCodeStr({ fileName }))
    ._(DirEnt.File.create)
    ._v();
}

function modContentToFileEntry({
  content,
  fileName,
}: {
  readonly content: string;
  readonly fileName: string;
}): Option<DEntryT<DirEnt.FileT<TypeDefT>>> {
  return _(contentToFile({ content, fileName }))
    ._(DEntry.createFromValue({ key: fileNameToGenerated(fileName) }))
    ._(O.Some.createAsOption)
    ._v();
}

function isSourceFileName(fileName: string): boolean {
  return _(fileName)._(Str.split('.'))._(A.length)._(Num.lt(2))._v();
}

function fileContentToFileEntry({
  fileName,
}: {
  readonly fileName: string;
}): (content: string) => Option<DEntryT<DirEnt.FileT<TypeDefT>>> {
  return (content) =>
    fileName === 'mod.ts' || isSourceFileName(fileName)
      ? O.None.createAsOption()
      : modContentToFileEntry({ content, fileName });
}

function dirToDef(
  entry: DEntryT<DirEntT<string>>
): Option<DEntryT<DirEnt.FileT<TypeDefT>>> {
  return _(entry.value)
    ._(
      DirEnt.matchSomeToOption({
        File: fileContentToFileEntry({ fileName: entry.key }),
      })
    )
    ._v();
}

function generateDomain(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
  return _(dir)
    ._(D.toEntries)
    ._(A.mapOptional(dirToDef))
    ._(D.fromEntries)
    ._(D.mapValues(DirEnt.matchSome({ File: typeDefToFileEnt })))
    ._(D.compactOption)
    ._(D.toEntries)
    ._(A.appendReduced(typesToMod))
    ._(D.fromEntries)
    ._v();
}

function dirToDef2(
  ent: DirEntT<string>,
  name: string
): Option<DirEntT<string>> {
  return _(ent)
    ._(
      DirEnt.mapSome({
        Dir: DirEnt.Dir.copy({
          // eslint-disable-next-line no-use-before-define
          child: name === 'domain' ? generateDomain : generateDir,
        }),
      })
    )
    ._v();
}

export function generateDir(dir: Dict<DirEntT<string>>): Dict<DirEntT<string>> {
  return D.mapValuesOptional(dirToDef2)(dir);
}
