import { LeftT } from './mod';

export * from './left.g';

export type _<L> = {
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
