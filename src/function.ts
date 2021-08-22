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

export type Flow<TPar, TInit> = {
  readonly _: <TRet>(f: (t: TPar) => TRet) => Flow<TRet, TInit>;
  readonly _v: (p: TInit) => TPar;
};

export function flow<TEnd, TInit>(f: (t: TInit) => TEnd): Flow<TEnd, TInit> {
  return {
    _: (nextMapper) => flow((t) => nextMapper(f(t))),
    _v: f,
  };
}
