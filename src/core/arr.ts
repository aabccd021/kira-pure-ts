import { _ as Arr } from './arr.g';

export * from './arr.g';

export type Type<A> = readonly A[];

export function fromAppended<A>(arr: Arr<A>): (newEl: A) => Arr<A> {
  return (newEl) => [...arr, newEl];
}

export type Fn<A, TRes> = (d: Arr<A>) => TRes;

export function reduce<A, TRes>(
  initialAcc: TRes,
  reducer: (acc: TRes, val: A, idx: number) => TRes
): Fn<A, TRes> {
  return (arr) => arr.reduce(reducer, initialAcc);
}

export function append<A>(newEl: A): Fn<A, Arr<A>> {
  return (arr) => [...arr, newEl];
}

export function map<A, TRes>(f: (a: A) => TRes): Fn<A, Arr<TRes>> {
  return (arr) => arr.map(f);
}
