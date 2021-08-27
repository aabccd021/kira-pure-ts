import { absurd } from '../../function';
import * as Left from './left';
import * as Right from './right';

export { Left, Right };

export type LeftT<R> = Left._<R> & {
  readonly _tag: 'Left';
};

export type RightT<R> = Right._<R> & {
  readonly _tag: 'Right';
};

export type EitherT<L, R> = LeftT<L> | RightT<R>;

export type Fn<L, R, TRes> = (e: EitherT<L, R>) => TRes;

export function map<L, R, TRes>(
  onLeft: (l: LeftT<L>) => TRes,
  onRight: (r: RightT<R>) => TRes
): Fn<L, R, TRes> {
  return (e) =>
    e._tag === 'Left' ? onLeft(e) : e._tag === 'Right' ? onRight(e) : absurd(e);
}

export function match<L, R, TRes>(
  onLeft: (e: L) => TRes,
  onRight: (a: R) => TRes
): Fn<L, R, TRes> {
  return map<L, R, TRes>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}
