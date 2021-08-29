// import { E, Either } from 'kira-pure';

import { Arr } from './mod';

// import { FromUnknownReport } from '../from_unknown';

// export function fromUnknown(
//   value: unknown,
//   trace: string
// ): Either<FromUnknownReport, string> {
//   return typeof value === 'string'
//     ? E.right(value)
//     : E.left({ message: 'is not string', trace: [trace], value });
// }

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
