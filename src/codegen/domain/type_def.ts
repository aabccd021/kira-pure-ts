import { DEntry, P2 } from '../../domain/mod';
import { A, Arr, D, Dict, O, Str } from '../../mod';
import { _ } from '../../ts/mod';
import { TypeStr, TypeStrT } from './mod';
import { create } from './type_def.g';

export * from './type_def.g';

export type TypeDefT = {
  readonly entries: Dict<string>;
  readonly generics: Arr<string>;
  readonly name: string;
};

export function createFromStr(str: string): TypeDefT {
  return _(str)
    ._(Str.split(' '))
    ._(A.lookup(1))
    ._(O.getSomeOrElse(() => ''))
    ._((nameStr) =>
      create({
        entries: _(str)
          ._(Str.replaceAll(' ', ''))
          ._(Str.replaceAll('{', ''))
          ._(Str.replaceAll('};', ''))
          ._(Str.replaceAll('readonly', ''))
          ._(Str.split('='))
          ._(A.lookup(1))
          ._(O.getSomeOrElse(() => ''))
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
                    P2.match((key, value) => DEntry.from({ key, value }))
                  )
                )
                ._v()
            )
          )
          ._(A.compactOption)
          ._(D.fromEntries)
          ._v(),
        generics: _(nameStr)
          ._(Str.replaceAll('>', ''))
          ._(Str.split('<'))
          ._(A.lookup(1))
          ._(
            O.match({
              None: () => A.createEmpty<string>(),
              Some: (s) => [s],
            })
          )
          ._v(),
        name: _(nameStr)
          ._(Str.split('<'))
          ._(A.lookup(0))
          ._(O.getSomeOrElse(() => ''))
          ._v(),
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
    generics: _(typeDef.generics)
      ._(Str.fromArr(','))
      ._(Str.prepend('<'))
      ._(Str.append('>'))
      ._v(),
    keys: _(typeDef.entries)._(D.keys)._(Str.fromArr(','))._v(),
    name: typeDef.name,
  });
}
