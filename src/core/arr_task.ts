import { _ as ArrTask } from './arr_task.g';
import { A, T } from './mod';

export * from './arr_task.g';

export type Type<U> = A._<T._<U>>;

/**
 *
 * @param tasks
 * @returns
 */
export function swap<T>(tasks: ArrTask<T>): T._<A._<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}
