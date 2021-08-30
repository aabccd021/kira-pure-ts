import { _ } from '../mod';
import { I, IO, O, Option, T, Task } from './mod';

export type TaskOptionT<O> = Task<Option<O>>;

export function someFrom<O>(o: NonNullable<O>): Task<O.SomeT<O>> {
  return T.fromValue(O.Some.from(o));
}

export type Fn<O, T> = (d: TaskOptionT<O>) => T;

export function match<O, T>(
  f: (o: O) => NonNullable<T>
): Fn<O, TaskOptionT<T>> {
  return T.match(O.matchSome(f));
}

export function chain<O, T>(
  f: (o: O) => TaskOptionT<T>
): Fn<O, TaskOptionT<T>> {
  return T.chain(
    O.map({
      None: () => T.fromValue(O.None.from()),
      Some: f,
    })
  );
}

export function chainTask<O, T>(
  f: (o: O) => Task<NonNullable<T>>
): Fn<O, TaskOptionT<T>> {
  return chain((o) => _(o)._(f)._(T.match(O.Some.asOptionFrom))._v());
}

export function chainIO<O, T>(
  f: (o: O) => IO<NonNullable<T>>
): Fn<O, TaskOptionT<T>> {
  return chain((o) =>
    _(o)._(f)._(I.match(O.Some.asOptionFrom))._(I.toTask)._v()
  );
}
