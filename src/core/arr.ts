export type _<A> = readonly A[];

export function fromAppended<A>(arr: _<A>): (newEl: A) => _<A> {
  return (newEl) => [...arr, newEl];
}

export type Fn<A, TRes> = (d: _<A>) => TRes;

export function reduce<A, TRes>(
  initialAcc: TRes,
  reducer: (acc: TRes, val: A, idx: number) => TRes
): Fn<A, TRes> {
  return (arr) => arr.reduce(reducer, initialAcc);
}

export function append<A>(newEl: A): Fn<A, _<A>> {
  return (arr) => [...arr, newEl];
}

export function map<A, TRes>(f: (a: A) => TRes): Fn<A, _<TRes>> {
  return (arr) => arr.map(f);
}
