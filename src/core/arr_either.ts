import { _ } from '..';
import { A, E } from './mod';

export type T<L, R> = A._<E._<L, R>>;

export type Fn<L, R, TRes> = (d: T<L, R>) => TRes;

export function swap<L, R>(a: T<L, R>): E._<L, A._<R>> {
  return _(a)
    ._(
      A.reduce(E.Right.asEitherFrom<L, A._<R>>([]), (acc, val) =>
        _(acc)
          ._(
            E.chain((acc) =>
              _(val)
                ._(E.map(A.fromAppended(acc)))
                ._v()
            )
          )
          ._v()
      )
    )
    ._v();
}
