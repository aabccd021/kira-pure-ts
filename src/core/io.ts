import { _ } from '../function';

export type IOT<I> = () => I;

export function invoke<I>(i: IOT<I>): I {
  return i();
}

export type Fn<I, T> = (i: IOT<I>) => T;

export function match<I, T>(f: (i: I) => T): Fn<I, IOT<T>> {
  return (i) => () => f(i());
}

export function chain<I, T>(f: (i: I) => IOT<T>): Fn<I, IOT<T>> {
  return (i) => f(i());
}

export function chainFirst<I>(f: (i: I) => IOT<unknown>): Fn<I, IOT<I>> {
  return chain((first) =>
    _(first)
      ._(f)
      ._(match(() => first))
      ._v()
  );
}

export function log<T>(i: IOT<T>): IOT<T> {
  return _(i)
    ._(chainFirst((i) => () => console.log(i)))
    ._v();
}
