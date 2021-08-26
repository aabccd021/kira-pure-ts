export * from './dict_entry.g';

export type Type<D> = {
  readonly key: string;
  readonly value: NonNullable<D>;
};
