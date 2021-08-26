import { _ } from '../..';
import { _ as Either, Fn, map, Right } from './either.g';

export * from './either.g';

/**
 *
 */
export function mapRight<L, R, RResult>(f: (a: R) => RResult): Fn<L, R, Either<L, RResult>> {
  return map<L, R, Either<L, RResult>>(
    (l) => l,
    (x) => Right.from(f(x.right))
  );
}

/**
 *
 */
export function mapLeft<L, R, LResult>(f: (l: L) => LResult): Fn<L, R, Either<LResult, R>> {
  return map<L, R, Either<LResult, R>>(
    (l) => ({ _tag: 'Left', errObj: l.errObj, left: f(l.left) }),
    (r) => r
  );
}

/**
 *
 */
export function chain<L, R, RResult>(
  f: (r: R) => Either<L, RResult>
): Fn<L, R, Either<L, RResult>> {
  return (e) =>
    _(e)
      ._(mapRight(f))
      ._(
        map(
          (l) => l,
          (r) => r.right
        )
      )
      ._v();
}

/**
 *
 */
// export function map2<L, A, B, T>(f: (a: A, b: B) => T): Fn<L, Tuple2<A, B>, EitherT<L, T>> {
//   return map(P.map2(f));
// }

/**
 *
 */
// export function map3<L, A, B, C, T>(
//   f: (a: A, b: B, c: C) => T
// ): Fn<L, Tuple3<A, B, C>, EitherT<L, T>> {
//   return map(P.map3(f));
// }

/**
 *
 */
// export function map4<L, A, B, C, D, T>(
//   f: (a: A, b: B, c: C, d: D) => T
// ): Fn<L, Tuple4<A, B, C, D>, EitherT<L, T>> {
//   return map(P.map4(f));
// }
