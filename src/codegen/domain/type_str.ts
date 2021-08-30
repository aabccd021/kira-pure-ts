import { capitalize } from '../../domain/str';
import { _, A, Arr, D, DEntryT, Dict, Str } from '../../mod';
import { TypeDefT } from './mod';
import { create, TypeStrT } from './type_str.g';

// eslint-disable-next-line import/exports-last
export type __ = {
  readonly def: TypeDefT;
  readonly entries: string;
  readonly fileName: string;
  readonly generics: string;
  readonly imports: string;
  readonly keys: string;
  readonly name: string;
};

// eslint-disable-next-line import/exports-last
export * from './type_str.g';

function entryToStr(entry: DEntryT<string>): string {
  return _(entry.key)
    ._(Str.append(':'))
    ._(Str.append(entry.value))
    ._(Str.append(';'))
    ._v();
}

function toTypeStrEntries(entries: Dict<string>): string {
  return _(entries)._(D.toEntries)._(A.map(entryToStr))._(Str.fromArr(''))._v();
}

function toTypeStrGenerics(generics: Arr<string>): string {
  return _(generics)
    ._(Str.fromArr(','))
    ._(Str.prepend('<'))
    ._(Str.append('>'))
    ._v();
}

function toTypeStrKeys(entries: Dict<string>): string {
  return _(entries)._(D.keys)._(Str.fromArr(','))._v();
}

function toTypeStrName(name: string): string {
  return _(name)._(Str.snakeToPascal)._(Str.append('T'))._v();
}

function filteredEntries(name: string): string {

}

function toCurriedConstrOfEntry(
  typeStr: TypeStrT
): (
  entry: DEntryT<string>,
  __: number,
  entries: Arr<DEntryT<string>>
) => string {
  return (entry, __, entries) =>
    _('export function createFrom')
      ._(Str.append(capitalize(entry.key)))
      ._(Str.append(typeStr.generics))
      ._(Str.append('({'))
      ._(Str.append(typeStr.keys))
      ._(Str.append('}:{'))
      ._(Str.append(typeStr.entries))
      ._(Str.append('}):'))
      ._(Str.append(typeStr.name))
      ._(Str.append(typeStr.generics))
      ._(Str.append('{'))
      ._(Str.append('return ('))
      ._(Str.append(entry.key))
      ._(Str.append(') => {'))
      ._(Str.append(typeStr.keys))
      ._(Str.append('};}'))
      ._v();
}

function toCurriedConstructor(typeStr: TypeStrT): string {
  return _(typeStr.def.entries)
    ._(D.toEntries)
    ._(A.map(toCurriedConstrOfEntry(typeStr)))
    ._(Str.fromArr(''))
    ._v();
}

export function fromTypeDef(typeDef: TypeDefT): TypeStrT {
  return create({
    def: typeDef,
    entries: toTypeStrEntries(typeDef.entries),
    fileName: typeDef.name,
    generics: toTypeStrGenerics(typeDef.generics),
    imports: typeDef.imports,
    keys: toTypeStrKeys(typeDef.entries),
    name: toTypeStrName(typeDef.name),
  });
}

export function toCompiledStr(typeStr: TypeStrT): string {
  return _("import {__} from './")
    ._(Str.append(typeStr.fileName))
    ._(Str.append("';"))
    ._(Str.append('export type '))
    ._(Str.append(typeStr.name))
    ._(Str.append(typeStr.generics))
    ._(Str.append('= __'))
    ._(Str.append(typeStr.generics))
    ._(Str.append(';'))
    ._(Str.append('export function create'))
    ._(Str.append(typeStr.generics))
    ._(Str.append('({'))
    ._(Str.append(typeStr.keys))
    ._(Str.append('}:{'))
    ._(Str.append(typeStr.entries))
    ._(Str.append('}):'))
    ._(Str.append(typeStr.name))
    ._(Str.append(typeStr.generics))
    ._(Str.append('{'))
    ._(Str.append('return {'))
    ._(Str.append(typeStr.keys))
    ._(Str.append('};}'))
    ._(Str.append(toCurriedConstructor(typeStr)))
    ._v();
}
