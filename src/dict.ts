import * as O from './option';
import { Dict, DictEntry, Option } from './type';

/**
 *
 * @param key
 * @returns
 */
export function createEntry<D>(key: string): (val: NonNullable<D>) => DictEntry<D> {
  return (val) => [key, val];
}

/**
 *
 * @param entries
 * @returns
 */
export function fromEntry<D>(entries: readonly DictEntry<D>[]): Dict<D> {
  return Object.fromEntries(entries);
}

/**
 *
 */
export type Fn<D, T> = (dict: Dict<D>) => T;

/**
 *
 * @param key
 * @returns
 */
export function lookup<D>(key: string): Fn<D, Option<D>> {
  return (d) => O.fromNullable(d[key]);
}

/**
 *
 * @param f
 * @returns
 */
export function mapEntries<V, T>(f: (val: V, key: string, idx: number) => T): Fn<V, readonly T[]> {
  return (d) => Object.entries(d).map(([key, val], idx) => f(val, key, idx));
}

/**
 *
 * @param f
 * @returns
 */
export function filter<V>(f: (val: V, key: string, idx: number) => boolean): Fn<V, Dict<V>> {
  return (d) => Object.fromEntries(Object.entries(d).filter(([key, val], idx) => f(val, key, idx)));
}

/**
 *
 * @param f
 * @returns
 */
export function mapValues<V, T>(
  f: (val: V, key: string, idx: number) => NonNullable<T>
): Fn<V, Dict<T>> {
  return (d) =>
    Object.fromEntries(Object.entries(d).map(([key, val], idx) => [key, f(val, key, idx)]));
}

/**
 *
 * @param initialAcc
 * @param reducer
 * @returns
 */
export function reduce<V, T>(
  initialAcc: T,
  reducer: (acc: T, val: V, key: string, idx: number) => T
): Fn<V, T> {
  return (d) =>
    Object.entries(d).reduce((acc, [key, val], idx) => reducer(acc, val, key, idx), initialAcc);
}
