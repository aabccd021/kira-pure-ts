export * from './task.g';

export type TaskT<T> = () => Promise<T>;

/**
 *
 * @param t
 * @returns
 */
export function fromValue<T>(t: T): TaskT<T> {
  return () => Promise.resolve(t);
}

/**
 *
 */
export type Fn<T, TResult> = (t: TaskT<T>) => TResult;

/**
 *
 * @param f
 * @returns
 */
export function match<T, TResult>(f: (t: T) => TResult): Fn<T, TaskT<TResult>> {
  return (t) => () => t().then(f);
}

/**
 *
 * @param t
 * @returns
 */
export function chain<T, TResult>(
  f: (t: T) => TaskT<TResult>
): Fn<T, TaskT<TResult>> {
  return (t) => () => t().then((tr) => f(tr)());
}
