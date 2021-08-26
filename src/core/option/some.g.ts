import { Type } from './some';

export type _<S> = Type<S> & {
  readonly _tag: 'Some';
};

export function from<S>(value: NonNullable<S>): _<S> {
  return { _tag: 'Some', value };
}
