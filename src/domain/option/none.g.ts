import { NoneT, OptionT } from './mod.g';

export function create(): NoneT {
  return { _tag: 'None' };
}

export function createAsOption<S>(): OptionT<S> {
  return create();
}
