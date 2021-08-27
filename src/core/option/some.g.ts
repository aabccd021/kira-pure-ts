import { Type } from './some';

export type SomeT<S> = Type<S> & {
  readonly _tag: 'Some';
};

export function from<S>(value: NonNullable<S>): SomeT<S> {
  return { _tag: 'Some', value };
}
