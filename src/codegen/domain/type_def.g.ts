import { Arr } from '../../mod';
import { TypeDefT } from './type_def';

export function create({
  generics,
}: {
  readonly generics: Arr<string>;
}): TypeDefT {
  return { generics };
}

export function createFromGenerics(generics: Arr<string>): TypeDefT {
  return create({ generics });
}
