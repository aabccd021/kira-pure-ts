import { Type } from './dict_entry';

export type _<D> = Type<D>;

export function from<D>({
  key,
  value,
}: {
  readonly key: string;
  readonly value: NonNullable<D>;
}): _<D> {
  return { key, value };
}

export function fromKeyWith<D>(value: NonNullable<D>): (key: string) => _<D> {
  return (key) => ({ key, value });
}

export function fromValueWith<D>(key: string): (value: NonNullable<D>) => _<D> {
  return (value) => ({ key, value });
}
