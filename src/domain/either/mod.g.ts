import { absurd } from '../../ts/mod';
import * as Left from './left';
import { __ } from './mod';
import * as Right from './right';

export { Left, Right };

export type LeftT<R> = Left.__<R> & {
  readonly _tag: 'Left';
};

export type RightT<R> = Right.__<R> & {
  readonly _tag: 'Right';
};

export type EitherT<L, R> = __ & (LeftT<L> | RightT<R>);

export type Fn<L, R, TResult> = (e: EitherT<L, R>) => TResult;

export function map<L, R, TResult>(
  onLeft: (l: LeftT<L>) => TResult,
  onRight: (r: RightT<R>) => TResult
): Fn<L, R, TResult> {
  return (e) =>
    e._tag === 'Left' ? onLeft(e) : e._tag === 'Right' ? onRight(e) : absurd(e);
}

export function match<L, R, TResult>(
  onLeft: (e: L) => TResult,
  onRight: (a: R) => TResult
): Fn<L, R, TResult> {
  return map<L, R, TResult>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}
