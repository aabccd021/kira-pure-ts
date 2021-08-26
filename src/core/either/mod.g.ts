import { EitherT, LeftT, RightT } from '../type.g';
import * as Left from './left/mod.g';
import * as Right from './right/mod.g';

export { Left, Right };

export type Fn<L, R, T> = (e: EitherT<L, R>) => T;

export function map<L, R, T>(
  onLeft: (l: LeftT<L>) => T,
  onRight: (r: RightT<R>) => T
): Fn<L, R, T> {
  return (e) => (e._tag === 'Left' ? onLeft(e) : onRight(e));
}

export function match<L, R, T>(onLeft: (e: L) => T, onRight: (a: R) => T): Fn<L, R, T> {
  return map<L, R, T>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}
