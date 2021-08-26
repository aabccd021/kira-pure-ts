import { EitherT } from '../../type.g';
import { from } from './fn';

export * from './fn';

export function asEitherFrom<L>(left: L): EitherT<L, unknown> {
  return from(left);
}
