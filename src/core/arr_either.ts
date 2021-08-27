import { _ } from '..';
import { A, ArrT, E, EitherT } from './mod';

export type ArrEitherT<L, R> = ArrT<EitherT<L, R>>;

export function swap<L, R>(a: ArrEitherT<L, R>): EitherT<L, ArrT<R>> {
  return _(a)
    ._(
      A.reduce(E.Right.asEitherFrom<L, ArrT<R>>([]), (acc, val) =>
        _(acc)
          ._(
            E.chain((acc) =>
              _(val)
                ._(E.matchRight(A.fromAppended(acc)))
                ._v()
            )
          )
          ._v()
      )
    )
    ._v();
}
