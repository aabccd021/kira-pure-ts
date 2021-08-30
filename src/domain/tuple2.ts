import { _ } from '../ts/mod';
import { A, Arr, E, Either, O, Option } from './mod';

export type Tuple2T<A, B> = readonly [A, B];

export function from<A, B>(a: A, b: B): Tuple2T<A, B> {
  return [a, b];
}

export function fromAppended<A, B>(f: (a: A) => B): (a: A) => Tuple2T<A, B> {
  return (a) => from(a, f(a));
}

export function fromPrepended<A, B>(f: (b: B) => A): (b: B) => Tuple2T<A, B> {
  return (b) => from(f(b), b);
}

export function swapEither<L, A, B>([a, r]: Tuple2T<
  Either<L, A>,
  Either<L, B>
>): Either<L, Tuple2T<A, B>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(r)
          ._(E.mapRight((r) => from(a, r)))
          ._v()
      )
    )
    ._v();
}

export function swapOption<A, B>([a, ...rest]: Tuple2T<
  Option<A>,
  Option<B>
>): Option<Tuple2T<A, B>> {
  return _(a)
    ._(
      O.chain((prev) =>
        _(...rest)
          ._(O.matchSome(fromPrepended(() => prev)))
          ._v()
      )
    )
    ._v();
}

export function fromArr<A>(arr: Arr<A>): Option<Tuple2T<A, A>> {
  return _(from(_(arr)._(A.lookup(0))._v(), _(arr)._(A.lookup(0))._v()))
    ._(swapOption)
    ._v();
}

export type Fn<A, B, TResult> = (p: Tuple2T<A, B>) => TResult;

export function match<A, B, TResult>(
  f: (a: A, b: B) => TResult
): Fn<A, B, TResult> {
  return (tuple) => f(...tuple);
}
