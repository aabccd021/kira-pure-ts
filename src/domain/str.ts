import { _ } from '../mod';
import { A, Arr, O, Str } from './mod';

export type StrT = string;

export type CFn<T> = (t: T) => string;

export function fromArr(separator: string): CFn<Arr<string>> {
  return (arr) => arr.join(separator);
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
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

export function snakeToPascal(snake: string): string {
  return _(snake)
    ._(Str.split('_'))
    ._(
      A.map((s) =>
        _(s)
          ._(Str.split(''))
          ._(A.lookup(0))
          ._(O.getSomeOrElse(() => ''))
          ._(Str.toUpperCase)
          ._(
            Str.append(
              _(s)._(Str.split(''))._(A.slice(1))._(Str.fromArr(''))._v()
            )
          )
          ._v()
      )
    )
    ._(Str.fromArr(''))
    ._v();
}
