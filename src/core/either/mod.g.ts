import { absurd } from '../../function';
import * as Left from './left';
import * as Right from './right';

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
  return (e) =>
    e._tag === 'Left' ? onLeft(e) : e._tag === 'Right' ? onRight(e) : absurd(e);
}

/**
 *
 */
export function match<L, R, TRes>(
  onLeft: (e: L) => TRes,
  onRight: (a: R) => TRes
): Fn<L, R, TRes> {
  return map<L, R, TRes>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}
