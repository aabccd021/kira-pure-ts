import { _ } from '../ts/mod';
import { E, Either, O, Option, P3, Tuple3 } from './mod';

export type Tuple4T<A, B, C, D> = readonly [A, B, C, D];

export function from<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4T<A, B, C, D> {
  return [a, b, c, d];
}

export function fromAppended<A, B, C, TNew>(
  f: (a: Tuple3<A, B, C>) => TNew
): (p: Tuple3<A, B, C>) => Tuple4T<A, B, C, TNew> {
  return (p) => from(...p, f(p));
}

export function fromPrepended<A, B, C, TNew>(
  f: (a: Tuple3<A, B, C>) => TNew
): (p: Tuple3<A, B, C>) => Tuple4T<TNew, A, B, C> {
  return (p) => from(f(p), ...p);
}

export function swapEither<L, A, B, C, D>([a, ...r]: Tuple4T<
  Either<L, A>,
  Either<L, B>,
  Either<L, C>,
  Either<L, D>
>): Either<L, Tuple4T<A, B, C, D>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(P3.from(...r))
          ._(P3.swapEither)
          ._(E.mapRight((r) => from(a, ...r)))
          ._v()
      )
    )
    ._v();
}

export function swapOption<A, B, C, D>([a, ...rest]: Tuple4T<
  Option<A>,
  Option<B>,
  Option<C>,
  Option<D>
>): Option<Tuple4T<A, B, C, D>> {
  return _(a)
    ._(
      O.chain((prev) =>
        _(P3.from(...rest))
          ._(P3.swapOption)
          ._(O.matchSome(fromPrepended(() => prev)))
          ._v()
      )
    )
    ._v();
}

export type Fn<A, B, C, D, TResult> = (p: Tuple4T<A, B, C, D>) => TResult;

export function match<A, B, C, D, TResult>(
  f: (a: A, b: B, c: C, d: D) => TResult
): Fn<A, B, C, D, TResult> {
  return (tuple) => f(...tuple);
}
