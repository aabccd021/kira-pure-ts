import { _ } from '../ts/mod';
import { O, Option, T, Task } from './mod';

export type OptionTaskT<T> = Option<Task<T>>;

export function swap<T>(ot: OptionTaskT<NonNullable<T>>): Task<Option<T>> {
  return _(ot)
    ._(
      O.map({
        None: () => T.fromValue(O.None.create()),
        Some: T.match(O.Some.createAsOption),
      })
    )
    ._v();
}
