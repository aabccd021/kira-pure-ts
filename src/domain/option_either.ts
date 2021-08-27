import { E, Either, O, Option } from './mod';

export type OptionEitherT<L, R> = Option<Either<L, R>>;

export type Fn<L, R, T> = (oe: OptionEitherT<L, R>) => T;

/**
 *
 * @param f
 * @returns
 */
export function mapRight<L, R, T>(
  f: (r: R) => T
): Fn<L, R, OptionEitherT<L, T>> {
  return O.match(E.mapRight(f));
}
