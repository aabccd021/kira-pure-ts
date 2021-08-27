export type Pipe<T> = {
  readonly _: <TResult>(f: (t: T) => TResult) => Pipe<TResult>;
  readonly _v: () => T;
};

export function _<T>(t: T): Pipe<T> {
  return {
    _: (f) => _(f(t)),
    _v: () => t,
  };
}
