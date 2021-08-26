export type _<A, B> = readonly [A, B];

export function from<A, B>(a: A, b: B): _<A, B> {
  return [a, b];
}

export function fromAppended<A, B>(f: (b: A) => B): (t: A) => _<A, B> {
  return (b) => from(b, f(b));
}

export function fromPrepended<A, B>(f: (b: B) => A): (t: B) => _<A, B> {
  return (b) => from(f(b), b);
}

export function match<A, B, C>(f: (a: A, b: B) => C): (tuple: _<A, B>) => C {
  return (tuple) => f(...tuple);
}
