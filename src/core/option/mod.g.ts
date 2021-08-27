import { absurd } from '../../function';
import * as None from './none';
import { NoneT } from './none';
import * as Some from './some';
import { SomeT } from './some';

export { None, Some };

export type OptionT<S> = NoneT | SomeT<S>;

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
