import { _, flow as f } from '../mod';
import { A, Arr, O, Option } from './mod';

export type StrT = string;

export type CFn<T> = (t: T) => string;

export function fromArr(separator: string): CFn<Arr<string>> {
  return (arr) => arr.join(separator);
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function isEmpty(str: string): boolean {
  return str === '';
}

export function isNotEmpty(str: string): boolean {
  return !isEmpty(str);
}

export type Fn<T> = (s: string) => T;

export function append(suffix: string): Fn<string> {
  return (s) => s + suffix;
}

export function prepend(prefix: string): Fn<string> {
  return (s) => prefix + s;
}

export function split(separator: string): Fn<Arr<string>> {
  return (s) => s.split(separator);
}

export function startsWith(
  searchString: string,
  position?: number
): Fn<boolean> {
  return (s) => s.startsWith(searchString, position);
}

export function replaceAll(
  searchValue: string,
  replaceValue: string
): Fn<string> {
  return (str) => str.replace(new RegExp(searchValue, 'g'), replaceValue);
}

export function slice(start?: number, end?: number): Fn<string> {
  return (str) => str.slice(start, end);
}

export function lookup(idx: number): Fn<Option<string>> {
  return f(split(''))._(A.lookup(idx))._v();
}

// export function flow<T, TRes>(): (t: T) => TRes {
//   return (t) => _(t)._()._v()
// }

export function capitalize(str: string): string {
  return _(str)
    ._(lookup(0))
    ._(O.getSomeOrElse(() => ''))
    ._(toUpperCase)
    ._(append(slice(1)(str)))
    ._v();
}

export function snakeToPascal(snake: string): string {
  return _(snake)._(split('_'))._(A.map(capitalize))._(fromArr(''))._v();
}
