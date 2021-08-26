import { _, A, D, Dict, T, Task } from 'kira-pure';

type Fn<D, T> = (d: Dict<Task<D>>) => T;

export function swap<D>(dt: Dict<Task<NonNullable<D>>>): Task<Dict<D>> {
  return _(dt)
    ._(
      D.mapEntries((el, key) =>
        _(el)
          ._(T.map((d) => _(d)._(D.createEntry(key))._v()))
          ._v()
      )
    )
    ._(A.parallel)
    ._(T.map(D.fromEntry))
    ._v();
}
