import { TypeStrT } from './type_str';

export function create({
  generics,
  keys,
  name,
}: {
  readonly generics: string;
  readonly keys: string;
  readonly name: string;
}): TypeStrT {
  return {
    generics,
    keys,
    name,
  };
}
