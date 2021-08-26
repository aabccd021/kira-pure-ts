import * as Left from './left.g';
import * as Right from './right.g';

export { Left, Right };

/**
 *
 */
export type _<L, R> = Left._<L> | Right._<R>;

/**
 *
 */
export type Fn<L, R, TRes> = (e: _<L, R>) => TRes;

/**
 *
 */
export function map<L, R, TRes>(
  onLeft: (l: Left._<L>) => TRes,
  onRight: (r: Right._<R>) => TRes
): Fn<L, R, TRes> {
  return (e) => (e._tag === 'Left' ? onLeft(e) : onRight(e));
}

/**
 *
 */
export function match<L, R, TRes>(onLeft: (e: L) => TRes, onRight: (a: R) => TRes): Fn<L, R, TRes> {
  return map<L, R, TRes>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}
