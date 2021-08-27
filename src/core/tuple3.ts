import { _ } from '..';
import { E, Either, P2, Tuple2 } from './mod';

export type Tuple3T<A, B, C> = readonly [A, B, C];

export function from<A, B, C>(a: A, b: B, c: C): Tuple3T<A, B, C> {
  return [a, b, c];
}

export function fromAppended<A, B, TNew>(
  f: (a: Tuple2<A, B>) => TNew
): (p: Tuple2<A, B>) => Tuple3T<A, B, TNew> {
  return (p) => from(...p, f(p));
}

export function fromPrepended<A, B, TNew>(
  f: (a: Tuple2<A, B>) => TNew
): (p: Tuple2<A, B>) => Tuple3T<TNew, A, B> {
  return (p) => from(f(p), ...p);
}

export function swapEither<L, A, B, C>([a, ...r]: Tuple3T<
  Either<L, A>,
  Either<L, B>,
  Either<L, C>
>): Either<L, Tuple3T<A, B, C>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(P2.from(...r))
          ._(P2.swapEither)
          ._(E.mapRight((r) => from(a, ...r)))
          ._v()
      )
    )
    ._v();
}

export type Fn<A, B, C, TRes> = (p: Tuple3T<A, B, C>) => TRes;

export function map<A, B, C, TRes>(
  f: (a: A, b: B, c: C) => TRes
): Fn<A, B, C, TRes> {
  return (tuple) => f(...tuple);
}
