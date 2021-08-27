import { _ } from '../function';
import { Dict, Either, D, E, P2 } from './mod';

export function compact<L, R>(
  de: Dict<Either<L, NonNullable<R>>>
): Either<L, Dict<R>> {
  return _(de)
    ._(
      D.reduce(E.Right.asEitherFrom<L, Dict<R>>({}), (acc, eVal, key) =>
        _(P2.from(acc, eVal))
          ._(PE.compact2)
          ._(E.map2((acc, val) => ({ ...acc, [key]: val })))
          ._v()
      )
    )
    ._v();
}
