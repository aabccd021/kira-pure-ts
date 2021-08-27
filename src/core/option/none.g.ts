import { Type } from './none';

export type NoneT = Type & {
  readonly _tag: 'None';
};

export function from(): NoneT {
  return { _tag: 'None' };
}
