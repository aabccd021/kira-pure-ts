import { _ } from '../mod';
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

export function chainTask<O, T>(
  f: (o: O) => Task<NonNullable<T>>
): Fn<O, TaskOptionT<T>> {
  return T.chain(
    O.map(
      () => T.fromValue(O.None.asOptionFrom()),
      (o) => _(o)._(f)._(T.match(O.Some.asOptionFrom))._v()
    )
  );
}
