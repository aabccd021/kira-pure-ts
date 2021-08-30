import { __ } from './dict_entry';
export type DictEntry<D> = __<D>;
export function create<D>({
  key,
  value,
}: {
  readonly key: string;
  readonly value: NonNullable<D>;
}): DictEntry<D> {
  return {
    key,
    value,
  };
}
