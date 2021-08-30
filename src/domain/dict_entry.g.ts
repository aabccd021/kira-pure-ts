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

export function createWithValue<D>(
  value: NonNullable<D>
): (key: string) => DictEntryT<D> {
  return (key) => ({ key, value });
}

export function createWithKey<D>(
  key: string
): (value: NonNullable<D>) => DictEntryT<D> {
  return (value) => ({ key, value });
}
