import { Option } from '../mod';
import { _ } from '../ts/mod';
import { E, Either, O, Task } from './mod';

export type ArrT<A> = readonly NonNullable<A>[];

export function createEmpty<A>(): ArrT<A> {
  return [];
}

export function fromAppended<A>(
  arr: ArrT<A>
): (newEl: NonNullable<A>) => ArrT<A> {
  return (newEl) => [...arr, newEl];
}

export type Fn<A, TResult> = (d: ArrT<A>) => TResult;

export function reduce<A, TResult>(
  initialAcc: TResult,
  reducer: (acc: TResult, val: A, idx: number) => TResult
): Fn<A, TResult> {
  return (arr) => arr.reduce(reducer, initialAcc);
}

export function append<A>(newEl: NonNullable<A>): Fn<A, ArrT<A>> {
  return (arr) => [...arr, newEl];
}

export function lookup<A>(idx: number): Fn<A, Option<A>> {
  return (arr) => O.fromNullable(arr[idx]);
}

export function map<A, TResult>(
  f: (a: A) => NonNullable<TResult>
): Fn<A, ArrT<TResult>> {
  return (arr) => arr.map(f);
}

export function swapTask<T>(tasks: ArrT<Task<NonNullable<T>>>): Task<ArrT<T>> {
  return () => Promise.all(tasks.map((task) => task()));
}

export function swapEither<L, R>(
  a: ArrT<Either<L, NonNullable<R>>>
): Either<L, ArrT<R>> {
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

export function extend<A>(newArr: ArrT<A>): Fn<A, ArrT<A>> {
  return (arr) => [...arr, ...newArr];
}

export function slice<A>(start?: number, end?: number): Fn<A, ArrT<A>> {
  return (arr) => arr.slice(start, end);
}

export function upsert<A>(idx: number, el: NonNullable<A>): Fn<A, ArrT<A>> {
  return (arr) =>
    _(arr)
      ._(slice(0, idx))
      ._(append(el))
      ._(
        extend(
          _(arr)
            ._(slice(idx + 1))
            ._v()
        )
      )
      ._v();
}

export function replace<A>(idx: number, f: (a: A) => A): Fn<A, ArrT<A>> {
  return _(arr)._(lookup(idx))._v();
}
