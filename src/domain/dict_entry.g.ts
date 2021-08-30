import { __ } from './dict_entry';

export type DEntryT<D> = __<D>;

export function create<D>({
  key,
  value,
}: {
  readonly key: string;
  readonly value: NonNullable<D>;
}): DEntryT<D> {
  return { key, value };
}

export function createWithValue<D>(
  value: NonNullable<D>
): (key: string) => DEntryT<D> {
  return (key) => ({ key, value });
}

export function createWithKey<D>(
  key: string
): (value: NonNullable<D>) => DEntryT<D> {
  return (value) => ({ key, value });
}
