import { Arr, Task } from './mod';

export type ArrTaskT<U> = Arr<Task<U>>;

/**
 *
 * @param tasks
 * @returns
 */
export function swap<T>(tasks: ArrTaskT<T>): Task<Arr<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}
