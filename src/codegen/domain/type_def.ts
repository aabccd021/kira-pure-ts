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
        entries: {},
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
          ._(A.lookup(1))
          ._(O.getSomeOrElse(() => ''))
          ._v(),
      })
    )
    ._v();
}

export function toTypeStr(typeDef: TypeDefT): TypeStrT {
  return TypeStr.create({
    generics: _(typeDef.generics)
      ._(Str.fromArr(','))
      ._(Str.prepend('<'))
      ._(Str.append('>'))
      ._v(),
    keys: _(typeDef.entries)._(D.keys)._(Str.fromArr(','))._v(),
    name: typeDef.name,
  });
}
