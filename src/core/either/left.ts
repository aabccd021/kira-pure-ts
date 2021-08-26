import { _ as Left } from './left.g';

export * from './left.g';

export type Type<L> = {
  readonly errObj: Error;
  readonly left: L;
};

export function from<L>(left: L): Left<L> {
  return {
    _tag: 'Left',
    errObj: new Error(),
    left,
  };
}
