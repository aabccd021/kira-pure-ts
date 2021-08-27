import { _ } from '..';
import { O, Option, T, Task } from './mod';

export type OptionTaskT<T> = Option<Task<T>>;

export function swap<T>(ot: OptionTaskT<NonNullable<T>>): Task<Option<T>> {
  return _(ot)
    ._(O.map(() => T.task(O.None.from()), T.match(O.Some.asOptionFrom)))
    ._v();
}
