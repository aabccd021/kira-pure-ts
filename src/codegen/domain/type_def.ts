import { DEntry, P2 } from '../../domain/mod';
import { A, Arr, D, Dict, O, Str } from '../../mod';
import { _ } from '../../ts/mod';
import { TypeStr, TypeStrT } from './mod';
import { create } from './type_def.g';

export * from './type_def.g';

export type TypeDefT = {
  readonly entries: Dict<string>;
  readonly generics: Arr<string>;
  readonly imports: string;
  readonly name: string;
};

export function createFromStr(str: string, fileName: string): TypeDefT {
  return _(str)
    ._(Str.replaceAll('type __<', ''))
    ._(Str.replaceAll('> = ', ''))
    ._((str) =>
      create({
        entries: _(str)
          ._(Str.split('{'))
          ._(A.lookup(1))
          ._(O.getSomeOrElse(() => ''))
          ._(Str.replaceAll(' ', ''))
          ._(Str.replaceAll('{', ''))
          ._(Str.replaceAll('};', ''))
          ._(Str.replaceAll('readonly', ''))
          ._(Str.split(';'))
          ._(
            A.map((entryStr) =>
              _(entryStr)
                ._(Str.split(':'))
                ._((kvArr) =>
                  P2.from(
                    _(kvArr)._(A.lookup(0))._v(),
                    _(kvArr)._(A.lookup(1))._v()
                  )
                )
                ._(P2.swapOption)
                ._(
                  O.matchSome(
                    P2.match((key, value) => DEntry.create({ key, value }))
                  )
                )
                ._v()
            )
          )
          ._(A.compactOption)
          ._(D.fromEntries)
          ._v(),
        generics: _(str)
          ._(Str.split('{'))
          ._(A.lookup(0))
          ._(O.getSomeOrElse(() => ''))
          ._(Str.split(','))
          ._v(),
        imports: _(str)
          ._(Str.split('export'))
          ._(A.lookup(0))
          ._(O.getSomeOrElse(() => ''))
          ._v(),
        name: fileName,
      })
    )
    ._v();
}

export function toTypeStr(typeDef: TypeDefT): TypeStrT {
  return TypeStr.create({
    entries: _(typeDef.entries)
      ._(D.toEntries)
      ._(
        A.map((entry) =>
          _(entry.key)
            ._(Str.append(':'))
            ._(Str.append(entry.value))
            ._(Str.append(';'))
            ._v()
        )
      )
      ._(Str.fromArr(''))
      ._v(),
    fileName: typeDef.name,
    generics: _(typeDef.generics)
      ._(Str.fromArr(','))
      ._(Str.prepend('<'))
      ._(Str.append('>'))
      ._v(),
    imports: typeDef.imports,
    keys: _(typeDef.entries)._(D.keys)._(Str.fromArr(','))._v(),
    name: _(typeDef.name)
      ._(Str.split('_'))
      ._(
        A.map((s) =>
          _(s)
            ._(Str.split(''))
            ._(A.lookup(0))
            ._(O.getSomeOrElse(() => ''))
            ._(Str.toUpperCase)
            ._(
              Str.append(
                _(s)._(Str.split(''))._(A.slice(1))._(Str.fromArr(''))._v()
              )
            )
            ._v()
        )
      )
      ._(Str.fromArr(''))
      ._(Str.append('T'))
      ._v(),
  });
}

export function createFromStrWithFileName(
  fileName: string
): (str: string) => TypeDefT {
  return (str) => createFromStr(str, fileName);
}
