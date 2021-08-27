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
