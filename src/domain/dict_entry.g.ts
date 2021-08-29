import { DictEntryT } from './dict_entry';

export function from<D>({
  key,
  value,
}: {
  readonly key: string;
  readonly value: NonNullable<D>;
}): DictEntryT<D> {
  return { key, value };
}

export function withValue<D>(
  value: NonNullable<D>
): (key: string) => DictEntryT<D> {
  return (key) => ({ key, value });
}

export function withKey<D>(
  key: string
): (value: NonNullable<D>) => DictEntryT<D> {
  return (value) => ({ key, value });
}
