import { Identity } from '../function';
import { __ } from './arr_iterator';
import { Arr } from './mod';

export type ArrIteratorT<A> = __<A>;

export type Fn<T, TResult> = (a: ArrIteratorT<T>) => TResult;

export function create<A>({
  arr,
  idx,
  item,
}: {
  readonly arr: Arr<A>;
  readonly idx: number;
  readonly item: A;
}): ArrIteratorT<A> {
  return {
    arr,
    idx,
    item,
  };
}

export function copy<A>({
  arr,
  idx,
  item,
}: {
  readonly arr?: Identity<Arr<A>>;
  readonly idx?: Identity<number>;
  readonly item?: Identity<A>;
}): Fn<A, ArrIteratorT<A>> {
  return (iter) =>
    create({
      arr: arr?.(iter.arr) ?? iter.arr,
      idx: idx?.(iter.idx) ?? iter.idx,
      item: item?.(iter.item) ?? iter.item,
    });
}

export function copyDetailed<A>({
  arr,
  idx,
  item,
}: {
  readonly arr?: (a: ArrIteratorT<A>) => Arr<A>;
  readonly idx?: (a: ArrIteratorT<A>) => number;
  readonly item?: (a: ArrIteratorT<A>) => A;
}): Fn<A, ArrIteratorT<A>> {
  return (iter) =>
    create({
      arr: arr?.(iter) ?? iter.arr,
      idx: idx?.(iter) ?? iter.idx,
      item: item?.(iter) ?? iter.item,
    });
}
