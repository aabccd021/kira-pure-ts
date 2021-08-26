import { _ as LeftT } from './left.g';

export type Type<L> = {
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
