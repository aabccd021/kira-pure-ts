import { absurd } from '../../ts/mod';
import { __ } from './mod';
import * as None from './none';
import * as Some from './some';

export { None, Some };

export type SomeT<S> = Some.__<S> & {
  readonly _tag: 'Some';
};

export type NoneT = None.__ & {
  readonly _tag: 'None';
};

export type OptionT<S> = __ & (NoneT | SomeT<S>);

export type Fn<S, T> = (e: OptionT<S>) => T;

export function map<S, T>(onNone: () => T, onSome: (s: S) => T): Fn<S, T> {
  return (o) =>
    o._tag === 'None'
      ? onNone()
      : o._tag === 'Some'
      ? onSome(o.value)
      : absurd(o);
}
