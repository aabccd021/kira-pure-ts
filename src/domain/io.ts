import { _ } from '../ts/mod';

export type IOT<I> = () => I;

export function fromValue<I>(i: I): IOT<I> {
  return () => i;
}

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

export function log<I>(i: I): IOT<void> {
  return () => console.log(i);
}
