export * from './dict_entry.g';

export type DictEntryT<D> = {
  readonly key: string;
  readonly value: NonNullable<D>;
};
