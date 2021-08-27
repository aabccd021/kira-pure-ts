import { E } from '../mod';
import { _, from } from './left';

export type LeftT<R> = _<R> & {
  readonly _tag: 'Left';
};

export function asEitherFrom<L>(left: L): E.EitherT<L, unknown> {
  return from(left);
}
