import { DEntry, DEntryT, P2 } from '../../domain/mod';
import { A, Arr, D, Dict, O, Option, Str } from '../../mod';
import { _ } from '../../ts/mod';
import { TypeStr, TypeStrT } from './mod';
import { create, TypeDefT } from './type_def.g';

// eslint-disable-next-line import/exports-last
export type __ = {
  readonly entries: Dict<string>;
  readonly generics: Arr<string>;
  readonly imports: string;
  readonly name: string;
};

// eslint-disable-next-line import/exports-last
export * from './type_def.g';

function rawToEntryStr(entryStr: string): Option<DEntryT<string>> {
  return _(entryStr)
    ._(Str.split(':'))
    ._(P2.fromArr)
    ._(O.matchSome(DEntry.createFromTuple))
    ._v();
}


function typeStrToEntries(typeStr: string): Dict<string> {
  return _(typeStr)
    ._(Str.split('{'))
    ._(A.lookup(1))
    ._(O.getSomeOrElse(() => ''))
    ._(Str.replaceAll(' ', ''))
    ._(Str.replaceAll('\n', ''))
    ._(Str.replaceAll('{', ''))
    ._(Str.replaceAll('};', ''))
    ._(Str.replaceAll('readonly', ''))
    ._(Str.split(';'))
    ._(A.filter(Str.isNotEmpty))
    ._(A.map(rawToEntryStr))
    ._(A.compactOption)
    ._(D.fromEntries)
    ._v();
}

function typeStrToGenerics(typeStr: string): Arr<string> {
  return _(typeStr)
    ._(Str.split('{'))
    ._(A.lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._(Str.split(','))
    ._v();
}

function typeStrToImports(typeStr: string): string {
  return _(typeStr)
    ._(Str.split('export'))
    ._(A.lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._v();
}

function removeExtension(fileName: string): string {
  return _(fileName)
    ._(Str.split('.'))
    ._(A.lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._v();
}

function createWithFileName(fileName: string): (typeStr: string) => TypeDefT {
  return (typeStr) =>
    create({
      entries: typeStrToEntries(typeStr),
      generics: typeStrToGenerics(typeStr),
      imports: typeStrToImports(typeStr),
      name: removeExtension(fileName),
    });
}

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

export function createFromStr(code: string, fileName: string): TypeDefT {
  return _(code)
    ._(Str.split('export '))
    ._(A.filter(Str.startsWith('type __')))
    ._(A.lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._(Str.replaceAll('type __<', ''))
    ._(Str.replaceAll('> = ', ''))
    ._(createWithFileName(fileName))
    ._v();
}

export function toTypeStr(typeDef: TypeDefT): TypeStrT {
  return TypeStr.create({
    entries: toTypeStrEntries(typeDef.entries),
    fileName: typeDef.name,
    generics: toTypeStrGenerics(typeDef.generics),
    imports: typeDef.imports,
    keys: toTypeStrKeys(typeDef.entries),
    name: toTypeStrName(typeDef.name),
  });
}

export function createFromCodeStr({
  fileName,
}: {
  readonly fileName: string;
}): (codeStr: string) => TypeDefT {
  return (str) => createFromStr(str, fileName);
}
