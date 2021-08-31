import { Arr } from './mod';

export type __<A> = {
  readonly arr: Arr<A>;
  readonly idx: number;
  readonly item: A;
};

export * from './arr_iterator.g';
