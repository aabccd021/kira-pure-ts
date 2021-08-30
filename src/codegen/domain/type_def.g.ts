import { Arr, Dict } from '../../mod';
import { TypeDefT } from './type_def';

export function create({
  generics,
  entries,
  name,
  imports,
}: {
  readonly entries: Dict<string>;
  readonly generics: Arr<string>;
  readonly imports: string;
  readonly name: string;
}): TypeDefT {
  return {
    entries,
    generics,
    imports,
    name,
  };
}
