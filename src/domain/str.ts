// import { E, Either } from 'kira-pure';

import { Arr } from './mod';

export type StrT = string;

export type CFn<T> = (t: T) => string;

export function fromArr(separator: string): CFn<Arr<string>> {
  return (arr) => arr.join(separator);
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
  return (str) => str.replaceAll(searchValue, replaceValue);
}
