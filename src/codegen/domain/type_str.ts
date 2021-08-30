import { _, Str } from '../../mod';

export * from './type_str.g';

export type TypeStrT = {
  readonly entries: string;
  readonly fileName: string;
  readonly generics: string;
  readonly imports: string;
  readonly keys: string;
  readonly name: string;
};

export function toCreateFnStr(typeStr: TypeStrT): string {
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
    ._v();
}
