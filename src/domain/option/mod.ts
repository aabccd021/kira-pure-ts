import { _ } from '../../ts/mod';
import { Fn, map, None, OptionT, Some } from './mod.g';

export * from './mod.g';

export type __ = { readonly _tag: string };

export function fromNullable<S>(
  s: NonNullable<S> | null | undefined
): OptionT<S> {
  // eslint-disable-next-line no-null/no-null
  return s === null || s === undefined ? None.create() : Some.create(s);
}

// eslint-disable-next-line
export function compactVoid(_: OptionT<void>): void {}

export function matchSome<S, T>(
  f: (s: S) => NonNullable<T>
): Fn<S, OptionT<T>> {
  return map<S, OptionT<T>>({
    None: () => None.create(),
    Some: (s) => Some.create(f(s)),
  });
}

export function chain<T, S>(f: (s: S) => OptionT<T>): Fn<S, OptionT<T>> {
  return (o) =>
    _(o)
      ._(matchSome(f))
      ._(
        map({
          None: () => None.create(),
          Some: (v) => v,
        })
      )
      ._v();
}

export function getSomeOrElse<S>(f: () => S): Fn<S, S> {
  return map({
    None: f,
    Some: (s) => s,
  });
}
