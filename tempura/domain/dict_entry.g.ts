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

export function createFromKey<D>({
  value,
}: {
  readonly value: NonNullable<D>;
}): (key: string) => DictEntryT<D> {
  return (key) => create({ key, value });
}

export function createFromValue<D>({
  key,
}: {
  readonly key: string;
}): (value: NonNullable<D>) => DictEntryT<D> {
  return (value) => create({ key, value });
}
