import * as E from './either';
import { _ } from './function';
import * as T from './task';
import { Either, Left, Right, Task } from './type';

/**
 *
 * @param r
 * @returns
 */
export function right<R>(r: R): Task<Right<R>> {
  return T.task(E.right(r));
}

/**
 *
 * @param l
 * @returns
 */
export function left<L>(l: L): Task<Left<L>> {
  return T.task(E.left(l));
}

/**
 *
 */
export type Fn<L, R, T> = (task: Task<Either<L, R>>) => T;

/**
 *
 * @param f
 * @returns
 */
export function map<L, R, RResult>(f: (r: R) => RResult): Fn<L, R, Task<Either<L, RResult>>> {
  return T.map(E.map(f));
}

/**
 *
 * @param f
 * @returns
 */
export function chain<L, R, RResult>(
  f: (r: R) => Task<Either<L, RResult>>
): Fn<L, R, Task<Either<L, RResult>>> {
  return T.chain(E.match(T.task, (r) => f(r.right)));
}

/**
 *
 * @param f
 * @returns
 */
export function chainFirst<L, R>(
  f: (r: R) => Task<Either<L, unknown>>
): Fn<L, R, Task<Either<L, R>>> {
  return chain((first) =>
    _(first)
      ._(f)
      ._(map(() => first))
      ._v()
  );
}

/**
 *
 * @param f
 * @returns
 */
export function getOrElse<L, R>(f: (l: Left<L>) => R): Fn<L, R, Task<R>> {
  return T.map(E.match(f, (r) => r.right));
}

/**
 *
 * @param f
 * @returns
 */
export function mapLeft<L, R, LResult>(f: (l: L) => LResult): Fn<L, R, Task<Either<LResult, R>>> {
  return T.map(E.mapLeft(f));
}
