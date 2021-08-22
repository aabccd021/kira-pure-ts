import { Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 */
export function tuple2<A, B>(a: A, b: B): Tuple2<A, B> {
  return [a, b];
}

/**
 *
 */
export function tuple3<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C> {
  return [a, b, c];
}

/**
 *
 */
export function tuple4<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D> {
  return [a, b, c, d];
}

/**
 *
 * @param f
 * @returns
 */
export function map2<A, B, C>(f: (a: A, b: B) => C): (tuple: Tuple2<A, B>) => C {
  return (tuple) => f(...tuple);
}

/**
 *
 * @param f
 * @returns
 */
export function map3<A, B, C, D>(f: (a: A, b: B, c: C) => D): (tuple: Tuple3<A, B, C>) => D {
  return (tuple) => f(...tuple);
}
/**
 *
 * @param f
 * @returns
 */
export function map4<A, B, C, D, E>(
  f: (a: A, b: B, c: C, d: D) => E
): (tuple: Tuple4<A, B, C, D>) => E {
  return (tuple) => f(...tuple);
}

/**
 *
 * @param f
 * @returns
 */
export function append2<A, B>(f: (b: A) => B): (t: A) => Tuple2<A, B> {
  return (b) => [b, f(b)];
}

/**
 *
 * @param f
 * @returns
 */
export function append3<A, B, C>(f: (a: A, b: B) => C): (t: Tuple2<A, B>) => Tuple3<A, B, C> {
  return (t) => [...t, f(...t)];
}

/**
 *
 * @param f
 * @returns
 */
export function append4<A, B, C, D>(
  f: (a: A, b: B, c: C) => D
): (t: Tuple3<A, B, C>) => Tuple4<A, B, C, D> {
  return (t) => [...t, f(...t)];
}

/**
 *
 * @param f
 * @returns
 */
export function prepend2<A, B>(f: (b: B) => A): (t: B) => Tuple2<A, B> {
  return (b) => tuple2(f(b), b);
}

/**
 *
 * @param f
 * @returns
 */
export function prepend3<A, B, C>(f: (b: B, c: C) => A): (t: Tuple2<B, C>) => Tuple3<A, B, C> {
  return (b) => tuple3(f(...b), ...b);
}

/**
 *
 * @param f
 * @returns
 */
export function prepend4<A, B, C, D>(
  f: (b: B, c: C, d: D) => A
): (t: Tuple3<B, C, D>) => Tuple4<A, B, C, D> {
  return (b) => tuple4(f(...b), ...b);
}
