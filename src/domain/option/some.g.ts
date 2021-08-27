import { OptionT, SomeT } from './mod.g';

export function from<S>(value: NonNullable<S>): SomeT<S> {
  return { _tag: 'Some', value };
}

export function asOptionFrom<S>(value: NonNullable<S>): OptionT<S> {
  return from(value);
}
