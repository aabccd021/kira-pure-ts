import { __ } from './dict_entry';
import { Tuple2 } from './mod';

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

export function createFromTuple<D>([key, value]: Tuple2<
  string,
  NonNullable<D>
>): DEntryT<D> {
  return create({ key, value });
}

export function createFromKey<D>({
  value,
}: {
  readonly value: NonNullable<D>;
}): (key: string) => DEntryT<D> {
  return (key) => create({ key, value });
}

export function createFromValue<D>({
  key,
}: {
  readonly key: string;
}): (value: NonNullable<D>) => DEntryT<D> {
  return (value) => create({ key, value });
}
