import { _ } from '..';
import { _ as ArrEither } from './arr_either.g';
import { A, E } from './mod';

export * from './arr_either.g';

export type Type<L, R> = A._<E._<L, R>>;

export function swap<L, R>(a: ArrEither<L, R>): E._<L, A._<R>> {
  return _(a)
    ._(
      A.reduce(E.Right.asEitherFrom<L, A._<R>>([]), (acc, val) =>
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
