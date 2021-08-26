import * as E from './either';
import { _ } from './function';
import * as P from './tuple';
import { Either, Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 */
export function compact2<L, A, B>([a, r]: Tuple2<Either<L, A>, Either<L, B>>): Either<
  L,
  Tuple2<A, B>
> {
  return _(a)
    ._(
      E.chain((a) =>
        _(r)
          ._(E.map((r) => P.tuple2(a, r)))
          ._v()
      )
    )
    ._v();
}

/**
 *
 */
export function compact3<L, A, B, C>([a, ...r]: Tuple3<
  Either<L, A>,
  Either<L, B>,
  Either<L, C>
>): Either<L, Tuple3<A, B, C>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(P.tuple2(...r))
          ._(compact2)
          ._(E.map((r) => P.tuple3(a, ...r)))
          ._v()
      )
    )
    ._v();
}

/**
 *
 */
export function compact4<L, A, B, C, D>([a, ...r]: Tuple4<
  Either<L, A>,
  Either<L, B>,
  Either<L, C>,
  Either<L, D>
>): Either<L, Tuple4<A, B, C, D>> {
  return _(a)
    ._(
      E.chain((a) =>
        _(P.tuple3(...r))
          ._(compact3)
          ._(E.map((r) => P.tuple4(a, ...r)))
          ._v()
      )
    )
    ._v();
}
