import { absurd } from '../../function';
import * as None from './none';
import * as Some from './some';

export { None, Some };

export type _<S> = None._ | Some._<S>;

export type Fn<S, T> = (e: _<S>) => T;

export function map<S, T>(onNone: () => T, onSome: (s: S) => T): Fn<S, T> {
  return (o) =>
    o._tag === 'None'
      ? onNone()
      : o._tag === 'Some'
      ? onSome(o.value)
      : absurd(o);
}

export function match<S, T>(f: (s: S) => NonNullable<T>): Fn<S, _<T>> {
  return map<S, _<T>>(
    () => None.from(),
    (s) => Some.from(f(s))
  );
}
