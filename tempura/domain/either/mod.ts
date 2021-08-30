// import { _ } from '../../ts/mod';
// import { P2, Tuple2 } from '../mod';
// import { EitherT, Fn, map, Right } from './mod.g';

// export * from './mod.g';

export type __ = { readonly _tag: string };

// export function mapRight<L, R, RResult>(
//   f: (a: R) => RResult
// ): Fn<L, R, EitherT<L, RResult>> {
//   return map(
//     (l) => l,
//     (x) => Right.asEitherFrom(f(x.right))
//   );
// }

// export function mapLeft<L, R, LResult>(
//   f: (l: L) => LResult
// ): Fn<L, R, EitherT<LResult, R>> {
//   return map<L, R, EitherT<LResult, R>>(
//     (l) => ({ _tag: 'Left', errObj: l.errObj, left: f(l.left) }),
//     (r) => r
//   );
// }

// export function chain<L, R, RResult>(
//   f: (r: R) => EitherT<L, RResult>
// ): Fn<L, R, EitherT<L, RResult>> {
//   return (e) =>
//     _(e)
//       ._(mapRight(f))
//       ._(
//         map(
//           (l) => l,
//           (r) => r.right
//         )
//       )
//       ._v();
// }

// export function match2<L, A, B, T>(
//   f: (a: A, b: B) => T
// ): Fn<L, Tuple2<A, B>, EitherT<L, T>> {
//   return mapRight(P2.match(f));
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
