import { _ as ArrTask } from './arr_task.g';
import { A, T } from './mod';

export * from './arr_task.g';

export type Type<U> = A.ArrT<T._<U>>;

/**
 *
 * @param tasks
 * @returns
 */
export function swap<T>(tasks: ArrTask<T>): T._<A.ArrT<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}
