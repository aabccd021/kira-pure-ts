import { _ } from './function';
import * as O from './option';
import * as P from './tuple';
import { Option, Tuple2, Tuple3, Tuple4 } from './type.g';

export function compact2<A, B>([a, ...rest]: Tuple2<
  Option<A>,
  Option<B>
>): Option<Tuple2<A, B>> {
  return _(a)
    ._(
      O.chain((prev) =>
        _(...rest)
          ._(O.map(P.prepend2(() => prev)))
          ._v()
      )
    )
    ._v();
}

export function compact3<A, B, C>([a, ...rest]: Tuple3<
  Option<A>,
  Option<B>,
  Option<C>
>): Option<Tuple3<A, B, C>> {
  return _(a)
    ._(
      O.chain((prev) =>
        _(P.tuple2(...rest))
          ._(compact2)
          ._(O.map(P.prepend3(() => prev)))
          ._v()
      )
    )
    ._v();
}

export function compact4<A, B, C, D>([a, ...rest]: Tuple4<
  Option<A>,
  Option<B>,
  Option<C>,
  Option<D>
>): Option<Tuple4<A, B, C, D>> {
  return _(a)
    ._(
      O.chain((prev) =>
        _(P.tuple3(...rest))
          ._(compact3)
          ._(O.map(P.prepend4(() => prev)))
          ._v()
      )
    )
    ._v();
}
