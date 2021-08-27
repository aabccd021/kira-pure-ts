import { LeftT } from './mod';

export * from './left.g';

export type __<L> = {
  readonly errObj: Error;
  readonly left: L;
};

export function from<L>(left: L): LeftT<L> {
  return {
    _tag: 'Left',
    errObj: new Error(),
    left,
  };
}
