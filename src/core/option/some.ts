export * from './some.g';

export type Type<S> = {
  readonly value: NonNullable<S>;
};
