import { Either, O, Option, Task, TaskEither, TE } from './mod';

export type OptionTaskEitherT<L, R> = Option<TaskEither<L, R>>;

export type Fn<L, R, T> = (ote: Option<Task<Either<L, R>>>) => T;

/**
 *
 * @param f
 * @returns
 */
export function getOrLeft<L, R>(f: () => L): Fn<L, R, Task<Either<L, R>>> {
  return O.getOrElse<Task<Either<L, R>>>(() => TE.leftFrom(f()));
}

/**
 *
 * @param f
 * @returns
 */
export function getOrRight<L, R>(f: () => R): Fn<L, R, Task<Either<L, R>>> {
  return O.getOrElse<Task<Either<L, R>>>(() => TE.rightFrom(f()));
}
