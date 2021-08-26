import * as O from './option';
import * as P from './tuple';
import { Option, Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 * @param f
 * @returns
 */
export function map2<A, B, T>(
  f: (a: A, b: B) => NonNullable<T>
): (op: Option<Tuple2<A, NonNullable<B>>>) => Option<T> {
  return O.map(P.map2(f));
}

/**
 *
 * @param f
 * @returns
 */
export function map3<A, B, C, T>(
  f: (a: A, b: B, c: C) => NonNullable<T>
): (op: Option<Tuple3<A, B, C>>) => Option<T> {
  return O.map(P.map3(f));
}

/**
 *
 * @param f
 * @returns
 */
export function map4<A, B, C, D, T>(
  f: (a: A, b: B, c: C, d: D) => NonNullable<T>
): (op: Option<Tuple4<A, B, C, D>>) => Option<T> {
  return O.map(P.map4(f));
}
