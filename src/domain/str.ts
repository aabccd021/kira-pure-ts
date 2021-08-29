// import { E, Either } from 'kira-pure';

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

export type Fn<T> = (s: string) => T;

export function append(appendix: string): Fn<string> {
  return (s) => s + appendix;
}
