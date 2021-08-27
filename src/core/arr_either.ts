import { _ } from '..';
import { A, Arr, E, Either } from './mod';

export type ArrEitherT<L, R> = Arr<Either<L, R>>;

export function swap<L, R>(a: ArrEitherT<L, R>): Either<L, Arr<R>> {
  return _(a)
    ._(
      A.reduce(E.Right.asEitherFrom<L, Arr<R>>([]), (acc, val) =>
        _(acc)
          ._(
            E.chain((acc) =>
              _(val)
                ._(E.mapRight(A.fromAppended(acc)))
                ._v()
            )
          )
          ._v()
      )
    )
    ._v();
}
