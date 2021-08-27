import { from } from './left';
import { EitherT } from './mod.g';

export function asEitherFrom<L>(left: L): EitherT<L, unknown> {
  return from(left);
}
