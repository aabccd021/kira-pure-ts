import { E } from '../mod';
import { Type } from './right';

export type RightT<R> = Type<R> & {
  readonly _tag: 'Right';
};

export function from<R>(right: R): RightT<R> {
  return { _tag: 'Right', right };
}

export function asEitherFrom<L, R>(right: R): E.EitherT<L, R> {
  return from(right);
}
