import { absurd } from '../../function';
import { _ } from './mod';
import * as None from './none';
import * as Some from './some';

export { None, Some };

export type SomeT<S> = Some._<S> & {
  readonly _tag: 'Some';
};

export type NoneT = None._ & {
  readonly _tag: 'None';
};

export type OptionT<S> = _ & (NoneT | SomeT<S>);

export type Fn<S, T> = (e: OptionT<S>) => T;

export function map<S, T>(onNone: () => T, onSome: (s: S) => T): Fn<S, T> {
  return (o) =>
    o._tag === 'None'
      ? onNone()
      : o._tag === 'Some'
      ? onSome(o.value)
      : absurd(o);
}

export function match<S, T>(f: (s: S) => NonNullable<T>): Fn<S, OptionT<T>> {
  return map<S, OptionT<T>>(
    () => None.from(),
    (s) => Some.from(f(s))
  );
}
