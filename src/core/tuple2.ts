export type Tuple2T<A, B> = readonly [A, B];

export function from<A, B>(a: A, b: B): Tuple2T<A, B> {
  return [a, b];
}

export function fromAppended<A, B>(f: (b: A) => B): (t: A) => Tuple2T<A, B> {
  return (b) => from(b, f(b));
}

export function fromPrepended<A, B>(f: (b: B) => A): (t: B) => Tuple2T<A, B> {
  return (b) => from(f(b), b);
}

export function map<A, B, C>(
  f: (a: A, b: B) => C
): (tuple: Tuple2T<A, B>) => C {
  return (tuple) => f(...tuple);
}
