// import { Either } from 'kira-pure';

// export type FromUnknownReport = {
//   readonly message: string;
//   readonly trace: readonly string[];
//   readonly value: unknown;
// };

// export type FromUnknown<T> = (
//   value: unknown,
//   trace: string
// ) => Either<FromUnknownReport, T>;

// export function addTrace(
//   trace: string
// ): (r: FromUnknownReport) => FromUnknownReport {
//   return (r) => ({
//     ...r,
//     trace: [trace, ...r.trace],
//   });
// }
