import { __ } from './dict_entry';
import { Tuple2 } from './mod';

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

export function createFromTuple<D>([key, value]: Tuple2<
  string,
  NonNullable<D>
>): DictEntryT<D> {
  return create({ key, value });
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
