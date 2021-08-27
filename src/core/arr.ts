import { _ } from '../function';
import { E, Either, Task } from './mod';

export type ArrT<A> = readonly A[];

export function fromAppended<A>(arr: ArrT<A>): (newEl: A) => ArrT<A> {
  return (newEl) => [...arr, newEl];
}

export type Fn<A, TRes> = (d: ArrT<A>) => TRes;

export function reduce<A, TRes>(
  initialAcc: TRes,
  reducer: (acc: TRes, val: A, idx: number) => TRes
): Fn<A, TRes> {
  return (arr) => arr.reduce(reducer, initialAcc);
}

export function append<A>(newEl: A): Fn<A, ArrT<A>> {
  return (arr) => [...arr, newEl];
}

export function map<A, TRes>(f: (a: A) => TRes): Fn<A, ArrT<TRes>> {
  return (arr) => arr.map(f);
}

export function swapTask<T>(tasks: ArrT<Task<T>>): Task<ArrT<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}

export function swapEither<L, R>(a: ArrT<Either<L, R>>): Either<L, ArrT<R>> {
  return _(a)
    ._(
      reduce(E.Right.asEitherFrom<L, ArrT<R>>([]), (acc, val) =>
        _(acc)
          ._(
            E.chain((acc) =>
              _(val)
                ._(E.mapRight(fromAppended(acc)))
                ._v()
            )
          )
          ._v()
      )
    )
    ._v();
}

