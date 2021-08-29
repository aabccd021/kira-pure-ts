import { TaskT } from './task';

export function from<T>(t: () => Promise<T>): TaskT<T> {
  return t;
}
