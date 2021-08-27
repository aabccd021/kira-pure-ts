import { from } from './left';
import { EitherT } from './mod.g';

export function asEitherFrom<L, R>(left: L): EitherT<L, R> {
  return from(left);
}
