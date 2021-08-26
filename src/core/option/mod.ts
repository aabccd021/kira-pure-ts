import { _ } from '../..';
import { _ as Option, Fn, map, match, None, Some } from './mod.g';

export * from './mod.g';

export function fromNullable<S>(
  s: NonNullable<S> | null | undefined
): Option<S> {
  // eslint-disable-next-line no-null/no-null
  return s === null || s === undefined ? None.from() : Some.from(s);
}

export function chain<T, S>(f: (s: S) => Option<T>): Fn<S, Option<T>> {
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
