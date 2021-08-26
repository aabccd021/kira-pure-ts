import { LeftT } from '../../type.g';

export function from<L>(left: L): LeftT<L> {
  return {
    _tag: 'Left',
    errObj: new Error(),
    left,
  };
}
