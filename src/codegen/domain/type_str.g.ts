import { TypeDefT } from './mod';
import { __ } from './type_str';

export type TypeStrT = __;

export function create({
  generics,
  keys,
  name,
  entries,
  imports,
  fileName,
  def,
}: {
  readonly def: TypeDefT;
  readonly entries: string;
  readonly fileName: string;
  readonly generics: string;
  readonly imports: string;
  readonly keys: string;
  readonly name: string;
}): TypeStrT {
  return {
    def,
    entries,
    fileName,
    generics,
    imports,
    keys,
    name,
  };
}
