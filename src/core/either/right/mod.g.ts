import { EitherT, RightT } from '../../type.g';

export function from<R>(right: R): RightT<R> {
  return { _tag: 'Right', right };
}

export function eitherFrom<R>(right: R): EitherT<unknown, R> {
  return from(right);
}
