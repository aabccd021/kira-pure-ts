import { _ } from '../mod';

export * from './task.g';

export type TaskT<T> = () => Promise<T>;

/**
 *
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
 */
export function match<T, TResult>(f: (t: T) => TResult): Fn<T, TaskT<TResult>> {
  return (t) => () => t().then(f);
}

/**
 *
 */
export function chain<T, TResult>(
  f: (t: T) => TaskT<TResult>
): Fn<T, TaskT<TResult>> {
  return (t) => () => t().then((tr) => f(tr)());
}

/**
 *
 */
export function chainFirst<T>(f: (t: T) => TaskT<unknown>): Fn<T, TaskT<T>> {
  return chain((first) =>
    _(first)
      ._(f)
      ._(match(() => first))
      ._v()
  );
}

/**
 *
 */
export function invoke<T>(t: TaskT<T>): Promise<T> {
  return t();
}

/**
 *
 */
export function log<T>(t: T): TaskT<void> {
  return fromValue(console.log(t));
}
