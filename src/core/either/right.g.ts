import { E } from '../mod';
import { Type } from './right';

export type _<R> = Type<R> & {
  readonly _tag: 'Right';
};

export function from<R>(right: R): _<R> {
  return { _tag: 'Right', right };
}

export function asEitherFrom<L, R>(right: R): E._<L, R> {
  return from(right);
}
