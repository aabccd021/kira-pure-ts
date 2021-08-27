import { _ } from '../ts/mod';
import { E, Either, T, Task } from './mod';

export type TaskEitherT<L, R> = Task<Either<L, R>>;

export function rightFrom<R>(r: R): Task<E.RightT<R>> {
  return T.task(E.Right.from(r));
}

export function rightAsEitherFrom<L, R>(r: R): TaskEitherT<L, R> {
  return T.task(E.Right.asEitherFrom(r));
}

export function leftFrom<R>(r: R): Task<E.LeftT<R>> {
  return T.task(E.Left.from(r));
}

export function leftAsEitherFrom<L, R>(l: L): TaskEitherT<L, R> {
  return T.task(E.Left.asEitherFrom(l));
}

/**
 *
 */
export type Fn<L, R, T> = (task: TaskEitherT<L, R>) => T;

/**
 *
 * @param f
 * @returns
 */
export function mapRight<L, R, RResult>(
  f: (r: R) => RResult
): Fn<L, R, TaskEitherT<L, RResult>> {
  return T.match(E.mapRight(f));
}

/**
 *
 * @param f
 * @returns
 */
export function chain<L, R, RResult>(
  f: (r: R) => TaskEitherT<L, RResult>
): Fn<L, R, TaskEitherT<L, RResult>> {
  return T.chain(E.map(T.task, (r) => f(r.right)));
}

/**
 *
 * @param f
 * @returns
 */
export function chainFirst<L, R>(
  f: (r: R) => TaskEitherT<L, unknown>
): Fn<L, R, TaskEitherT<L, R>> {
  return chain((first) =>
    _(first)
      ._(f)
      ._(mapRight(() => first))
      ._v()
  );
}

/**
 *
 * @param f
 * @returns
 */
export function getOrElse<L, R>(f: (l: E.LeftT<L>) => R): Fn<L, R, Task<R>> {
  return T.match(E.map(f, (r) => r.right));
}

/**
 *
 * @param f
 * @returns
 */
export function mapLeft<L, R, LResult>(
  f: (l: L) => LResult
): Fn<L, R, TaskEitherT<LResult, R>> {
  return T.match(E.mapLeft(f));
}
