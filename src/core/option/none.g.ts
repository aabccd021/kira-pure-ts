import { Type } from './none';

export type _ = Type & {
  readonly _tag: 'None';
};

export function from(): _ {
  return { _tag: 'None' };
}
