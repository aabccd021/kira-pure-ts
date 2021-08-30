import { _, Str } from '../../mod';

export * from './type_str.g'

export type TypeStrT = {
  readonly generics: string;
  readonly keys: string;
  readonly name: string;
};

export function toCreateFnStr(typeStr: TypeStrT): string {
  return _('export function create')
    ._(Str.append(typeStr.generics))
    ._(Str.append('({'))
    ._(Str.append(typeStr.keys))
    ._(Str.append('}:{'))
    ._(Str.append('}):'))
    ._(Str.append(typeStr.name))
    ._(Str.append(typeStr.generics))
    ._(Str.append('{'))
    ._(Str.append('return {'))
    ._(Str.append(typeStr.keys))
    ._(Str.append('};}'))
    ._v();
}
