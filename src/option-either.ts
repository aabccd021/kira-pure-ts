import * as E from './either';
import { _ } from './function';
import * as O from './option';
import { Either, Option } from './type';

export type Fn<L, R, T> = (oe: Option<Either<L, R>>) => T;

/**
 *
 * @param f
 * @returns
 */
export function map<L, R, T>(f: (r: R) => T): Fn<L, R, Option<Either<L, T>>> {
  return O.map(E.map(f));
}

/**
 *
 * @param oe
 * @returns
 */
export function toOption<L, R>(oe: Option<Either<L, NonNullable<R>>>): Option<Option<R>> {
  return _(oe)._(O.map(E.toOption))._v();
}
