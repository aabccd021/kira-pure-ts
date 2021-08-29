import { O, Option, T, Task } from './mod';

export type TaskOptionT<O> = Task<Option<O>>;

export type Fn<O, T> = (d: TaskOptionT<O>) => T;

export function match<O, T>(
  f: (o: O) => NonNullable<T>
): Fn<O, TaskOptionT<T>> {
  return T.match(O.match(f));
}

export function chain<O, T>(
  f: (o: O) => TaskOptionT<T>
): Fn<O, TaskOptionT<T>> {
  return T.chain(O.map(() => T.fromValue(O.None.from()), f));
}
