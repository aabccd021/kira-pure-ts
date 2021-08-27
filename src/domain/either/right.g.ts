import { EitherT, RightT } from './mod.g';

export function from<R>(right: R): RightT<R> {
  return { _tag: 'Right', right };
}

export function asEitherFrom<L, R>(right: R): EitherT<L, R> {
  return from(right);
}
