import { ArrIteratorT } from '../../domain/arr_iterator.g';
import { ArrIterator } from '../../domain/mod.g';
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
  return _(entry.key)._(Str.append(':'))._(Str.append(entry.value))._v();
}

function entriesToStr(entries: Arr<DEntryT<string>>): string {
  return _(entries)._(A.map(entryToStr))._(Str.fromArr(';'))._v();
}

function toTypeStrEntries(entries: Dict<string>): string {
  return _(entries)._(D.toEntries)._(entriesToStr)._v();
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

function keyStrOfEntries(arr: Arr<DEntryT<string>>): string {
  return _(arr)
    ._(A.map((item) => item.key))
    ._(Str.fromArr(','))
    ._v();
}

function toTypeStrName(name: string): string {
  return _(name)._(Str.snakeToPascal)._(Str.append('T'))._v();
}

function toCurriedConstrOfEntry(
  typeStr: TypeStrT
): (a: ArrIteratorT<DEntryT<string>>) => string {
  return (iter) =>
    _('export function createFrom')
      ._(Str.append(Str.capitalize(iter.item.key)))
      ._(Str.append(typeStr.generics))
      ._(Str.append('({'))
      ._(Str.append(keyStrOfEntries(iter.arr)))
      ._(Str.append('}:{'))
      ._(Str.append(entriesToStr(iter.arr)))
      ._(Str.append('}): ('))
      ._(Str.append(entryToStr(iter.item)))
      ._(Str.append(') => '))
      ._(Str.append(typeStr.name))
      ._(Str.append(typeStr.generics))
      ._(Str.append('{'))
      ._(Str.append('return ('))
      ._(Str.append(iter.item.key))
      ._(Str.append(') => create({'))
      ._(Str.append(typeStr.keys))
      ._(Str.append('});}'))
      ._v();
}

function filterSelf<A>(iter: ArrIteratorT<A>): Arr<A> {
  return _(iter.arr)
    ._(A.filter((el) => el !== iter.item))
    ._v();
}

function toCurriedConstructor(typeStr: TypeStrT): string {
  return _(typeStr.def.entries)
    ._(D.toEntries)
    ._(A.mapDetail(ArrIterator.copyDetailed({ arr: filterSelf })))
    ._(A.map(toCurriedConstrOfEntry(typeStr)))
    ._(Str.fromArr('\n\n'))
    ._v();
}

function defaultConstructorStrOf(typeStr: TypeStrT): string {
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
    ._(Str.append('};}\n\n'))
    ._v();
}

export function createFromTypeDef(typeDef: TypeDefT): TypeStrT {
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
  return _(defaultConstructorStrOf(typeStr))
    ._(Str.append(toCurriedConstructor(typeStr)))
    ._v();
}
