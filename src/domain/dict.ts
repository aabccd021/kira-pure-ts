import { _ } from '../ts/mod';
import {
  A,
  Arr,
  DEntry,
  DEntryT,
  E,
  Either,
  O,
  Option,
  P2,
  T,
  Task,
} from './mod';

// eslint-disable-next-line functional/prefer-type-literal
export interface DictT<D> {
  readonly [index: string]: NonNullable<D>;
}

export function fromDEntryArr<D>(entries: readonly DEntryT<D>[]): DictT<D> {
  return Object.fromEntries(entries.map(({ key, value }) => [key, value]));
}

export type Fn<D, T> = (dict: DictT<D>) => T;

export function lookup<D>(key: string): Fn<D, Option<D>> {
  return (d) => O.fromNullable(d[key]);
}

export function mapEntries<V, T>(
  f: (val: V, key: string, idx: number) => T
): Fn<V, readonly T[]> {
  return (d) => Object.entries(d).map(([key, val], idx) => f(val, key, idx));
}

export function filter<V>(
  f: (val: V, key: string, idx: number) => boolean
): Fn<V, DictT<V>> {
  return (d) =>
    Object.fromEntries(
      Object.entries(d).filter(([key, val], idx) => f(val, key, idx))
    );
}

export function mapValues<V, T>(
  f: (val: V, key: string, idx: number) => NonNullable<T>
): Fn<V, DictT<T>> {
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

export function values<D>(d: DictT<D>): Arr<D> {
  return Object.values(d);
}

export function compactOption<S>(d: DictT<Option<NonNullable<S>>>): DictT<S> {
  return _(d)
    ._(
      reduce({}, (acc, oVal, key) =>
        _(oVal)
          ._(O.matchSome((val) => ({ ...acc, [key]: val })))
          ._(O.getSomeOrElse(() => acc))
          ._v()
      )
    )
    ._v();
}

// eslint-disable-next-line
export function compactVoid(_: DictT<void>): void {}

export function swapEither<L, R>(
  de: DictT<Either<L, NonNullable<R>>>
): Either<L, DictT<R>> {
  return _(de)
    ._(
      reduce(E.Right.asEitherFrom<L, DictT<R>>({}), (acc, eVal, key) =>
        _(P2.from(acc, eVal))
          ._(P2.swapEither)
          ._(E.match2((acc, val) => ({ ...acc, [key]: val })))
          ._v()
      )
    )
    ._v();
}

export function swapTask<D>(dt: DictT<Task<NonNullable<D>>>): Task<DictT<D>> {
  return _(dt)
    ._(
      mapEntries((el, key) =>
        _(el)
          ._(T.match(DEntry.withKey(key)))
          ._v()
      )
    )
    ._(A.swapTask)
    ._(T.match(fromDEntryArr))
    ._v();
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
