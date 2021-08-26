import { _, IO } from 'kira-pure';

type Fn<I, T> = (i: IO<I>) => T;

export function map<I, T>(f: (i: I) => T): Fn<I, IO<T>> {
  return (i) => () => f(i());
}

export function chain<I, T>(f: (i: I) => IO<T>): Fn<I, IO<T>> {
  return (i) => f(i());
}

export function chainFirst<I>(f: (i: I) => IO<unknown>): Fn<I, IO<I>> {
  return chain((first) =>
    _(first)
      ._(f)
      ._(map(() => first))
      ._v()
  );
}

export function invoke<I>(i: IO<I>): I {
  return i();
}

export function log<T>(i: IO<T>): IO<T> {
  return _(i)
    ._(chainFirst((i) => () => console.log(i)))
    ._v();
}
