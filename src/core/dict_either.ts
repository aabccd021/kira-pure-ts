import * as D from './dict';
import * as E from './either';
import { _ } from './function';
import * as P from './tuple';
import * as PE from './tuple_either';
import { Dict, Either } from './type.g';

export function compact<L, R>(de: Dict<Either<L, NonNullable<R>>>): Either<L, Dict<R>> {
  return _(de)
    ._(
      D.reduce(E.rightE<L, Dict<R>>({}), (acc, eVal, key) =>
        _(P.tuple2(acc, eVal))
          ._(PE.compact2)
          ._(E.map2((acc, val) => ({ ...acc, [key]: val })))
          ._v()
      )
    )
    ._v();
}
