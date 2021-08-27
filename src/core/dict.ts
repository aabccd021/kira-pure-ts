import { _ as Dict } from './dict.g';
import { A, DictEntry, O } from './mod';

export * from './dict.g';

// eslint-disable-next-line functional/prefer-type-literal
export interface Type<D> {
  readonly [index: string]: NonNullable<D>;
}

export function fromEntry<D>(entries: readonly DictEntry._<D>[]): Dict<D> {
  return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
}

export type Fn<D, T> = (dict: Dict<D>) => T;

export function lookup<D>(key: string): Fn<D, O._<D>> {
  return (d) => O.fromNullable(d[key]);
}

export function mapEntries<V, T>(
  f: (val: V, key: string, idx: number) => T
): Fn<V, readonly T[]> {
  return (d) => Object.entries(d).map(([key, val], idx) => f(val, key, idx));
}

export function filter<V>(
  f: (val: V, key: string, idx: number) => boolean
): Fn<V, Dict<V>> {
  return (d) =>
    Object.fromEntries(
      Object.entries(d).filter(([key, val], idx) => f(val, key, idx))
    );
}

export function mapValues<V, T>(
  f: (val: V, key: string, idx: number) => NonNullable<T>
): Fn<V, Dict<T>> {
  return (d) =>
    Object.fromEntries(
      Object.entries(d).map(([key, val], idx) => [key, f(val, key, idx)])
    );
}

export function reduce<V, T>(
  initialAcc: T,
  reducer: (acc: T, val: V, key: string, idx: number) => T
): Fn<V, T> {
  return (d) =>
    Object.entries(d).reduce(
      (acc, [key, val], idx) => reducer(acc, val, key, idx),
      initialAcc
    );
}

export function everyValue<D>(f: (dEl: D) => boolean): Fn<D, boolean> {
  return (d) => Object.values(d).every(f);
}

export function values<D>(d: Dict<D>): A.ArrT<D> {
  return Object.values(d);
}

// export function dictFromUnknownWith(
//   trace: string
// ): (value: unknown) => Either<FromUnknownReport, Dict<unknown>> {
//   return (value) =>
//     typeof value === 'object' &&
//     Object.keys(value as Dict<unknown>).every((key) => typeof key === 'string')
//       ? E.right(value as Dict<unknown>)
//       : E.left({ message: 'is not dict', trace: [trace], value });
// }

// export function fromUnknown<T>(
//   value: unknown,
//   trace: string,
//   elFromUnknown: FromUnknown<NonNullable<T>>
// ): Either<FromUnknownReport, Dict<T>> {
//   return _(value)
//     ._(dictFromUnknownWith(trace))
//     ._(E.map(D.mapValues((val, key) => elFromUnknown(val, key))))
//     ._(E.chain(DE.compact))
//     ._v();
// }
//
