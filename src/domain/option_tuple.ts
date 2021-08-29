import { O, Option, P2, P3, P4, Tuple2, Tuple3, Tuple4 } from './mod';

/**
 *
 * @param f
 * @returns
 */
export function match2<A, B, T>(
  f: (a: A, b: B) => NonNullable<T>
): (op: Option<Tuple2<A, NonNullable<B>>>) => Option<T> {
  return O.matchSome(P2.match(f));
}

/**
 *
 * @param f
 * @returns
 */
export function match3<A, B, C, T>(
  f: (a: A, b: B, c: C) => NonNullable<T>
): (op: Option<Tuple3<A, B, C>>) => Option<T> {
  return O.matchSome(P3.match(f));
}

/**
 *
 * @param f
 * @returns
 */
export function match4<A, B, C, D, T>(
  f: (a: A, b: B, c: C, d: D) => NonNullable<T>
): (op: Option<Tuple4<A, B, C, D>>) => Option<T> {
  return O.matchSome(P4.match(f));
}
