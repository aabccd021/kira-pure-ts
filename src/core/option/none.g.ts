import { NoneT, OptionT } from './mod.g';

export function from(): NoneT {
  return { _tag: 'None' };
}

export function asOptionFrom<S>(): OptionT<S> {
  return from();
}
