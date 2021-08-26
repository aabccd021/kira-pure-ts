import { O, Option, T, Task } from 'kira-pure';

export type Fn<O, T> = (d: Task<Option<O>>) => T;

export function map<O, T>(f: (o: O) => NonNullable<T>): Fn<O, Task<Option<T>>> {
  return T.map(O.map(f));
}

export function chain<O, T>(
  f: (o: O) => Task<Option<T>>
): Fn<O, Task<Option<T>>> {
  return T.chain(O.fold(() => T.task(O.none), f));
}
