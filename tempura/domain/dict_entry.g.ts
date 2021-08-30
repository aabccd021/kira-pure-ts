import { __ } from './dict_entry';
export type DictEntryT<D> = __<D>;
export function create<D>({
  key,
  value,
}: {
  readonly key: string;
  readonly value: NonNullable<D>;
}): DictEntryT<D> {
  return { key, value };
}
