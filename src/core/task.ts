import { _ as Task } from './task.g';

export * from './task.g';

export type Type<T> = () => Promise<T>;

/**
 *
 * @param t
 * @returns
 */
export function task<T>(t: T): Task<T> {
  return () => Promise.resolve(t);
}

/**
 *
 */
export type Fn<T, TResult> = (t: Task<T>) => TResult;

/**
 *
 * @param f
 * @returns
 */
export function map<T, TResult>(f: (t: T) => TResult): Fn<T, Task<TResult>> {
  return (t) => () => t().then(f);
}

/**
 *
 * @param t
 * @returns
 */
export function chain<T, TResult>(
  f: (t: T) => Task<TResult>
): Fn<T, Task<TResult>> {
  return (t) => () => t().then((tr) => f(tr)());
}
