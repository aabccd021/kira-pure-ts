import { _, O, Option, T, Task } from 'kira-pure';

export function swap<T>(ot: Option<Task<NonNullable<T>>>): Task<Option<T>> {
  return _(ot)
    ._(
      O.fold(
        () => T.task(O.none) as Task<Option<T>>,
        (t) => _(t)._(T.map(O.some))._v()
      )
    )
    ._v();
}
