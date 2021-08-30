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

export function getGenericsFromTypeName(typeName: string): Arr<string> {
  return _(typeName)
    ._(Str.replaceAll('>', ''))
    ._(Str.split('<'))
    ._(A.lookup(1))
    ._(
      O.match({
        None: () => A.createEmpty<string>(),
        Some: (s) => [s],
      })
    )
    ._v();
}

export function createFromStr(str: string): TypeDefT {
  return create({
    entries: {},
    generics: _(str)
      ._(Str.split(' '))
      ._(A.lookup(1))
      ._(O.getSomeOrElse(() => ''))
      ._(getGenericsFromTypeName)
      ._v(),
    name: 'Ab',
  });
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
