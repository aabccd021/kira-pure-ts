import { OptionT, SomeT } from './mod.g';

export function create<S>(value: NonNullable<S>): SomeT<S> {
  return { _tag: 'Some', value };
}

export function createAsOption<S>(value: NonNullable<S>): OptionT<S> {
  return create(value);
}
