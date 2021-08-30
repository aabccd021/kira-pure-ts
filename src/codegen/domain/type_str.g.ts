import { TypeStrT } from './type_str';

export function create({
  generics,
  keys,
  name,
  entries,
  imports,
  fileName,
}: {
  readonly entries: string;
  readonly fileName: string;
  readonly generics: string;
  readonly imports: string;
  readonly keys: string;
  readonly name: string;
}): TypeStrT {
  return {
    entries,
    fileName,
    generics,
    imports,
    keys,
    name,
  };
}
