import { Arr, Dict } from '../../mod';
import { TypeDefT } from './type_def';

export function create({
  generics,
  entries,
  name,
}: {
  readonly entries: Dict<string>;
  readonly generics: Arr<string>;
  readonly name: string;
}): TypeDefT {
  return {
    entries,
    generics,
    name,
  };
}
