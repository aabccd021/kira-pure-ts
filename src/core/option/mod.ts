import { _ } from '../..';
import { Fn, map, None, OptionT, Some } from './mod.g';

export * from './mod.g';

export type _ = { readonly _tag: string };

export function fromNullable<S>(
  s: NonNullable<S> | null | undefined
): OptionT<S> {
  // eslint-disable-next-line no-null/no-null
  return s === null || s === undefined ? None.from() : Some.from(s);
}

export function match<S, T>(f: (s: S) => NonNullable<T>): Fn<S, OptionT<T>> {
  return map<S, OptionT<T>>(
    () => None.from(),
    (s) => Some.from(f(s))
  );
}

export function chain<T, S>(f: (s: S) => OptionT<T>): Fn<S, OptionT<T>> {
  return (o) =>
    _(o)
      ._(match(f))
      ._(
        map(
          () => None.from(),
          (v) => v
        )
      )
      ._v();
}

export function getOrElse<S>(f: () => S): Fn<S, S> {
  return map(f, (s) => s);
}
