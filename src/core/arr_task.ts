import { ArrT, Task } from './type.g';

/**
 *
 */
export type Fn<T, TResult> = (tasks: ArrT<Task<T>>) => TResult;

/**
 *
 * @param tasks
 * @returns
 */
export function parallel<T>(tasks: ArrT<Task<T>>): Task<ArrT<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}
