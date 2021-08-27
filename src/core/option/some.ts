export * from './some.g';

export type _<S> = {
  readonly value: NonNullable<S>;
};
