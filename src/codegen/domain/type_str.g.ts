import { TypeStrT } from './type_str';

export function create({
  generics,
  keys,
  name,
  entries,
}: {
  readonly entries: string;
  readonly generics: string;
  readonly keys: string;
  readonly name: string;
}): TypeStrT {
  return {
    entries,
    generics,
    keys,
    name,
  };
}
