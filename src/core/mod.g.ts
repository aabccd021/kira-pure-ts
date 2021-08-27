import { ArrT } from './arr';
import { DictT } from './dict';
import { DictEntryT } from './dict_entry';
import { EitherT } from './either/mod';
import { IOT } from './io';
import { OptionT } from './option/mod';
import { TaskT } from './task';
import { TaskEitherT } from './task_either';
import { Tuple2T } from './tuple2';
import { Tuple3T } from './tuple3';
import { Tuple4T } from './tuple4';

export * as Arr from './arr';
export * as Dict from './dict';
export * as DictEntry from './dict_entry';
export * as Either from './either/mod';
export * as IO from './io';
export * as Option from './option/mod';
export * as Task from './task';
export * as TaskEither from './task_either';
export * as Tuple2 from './tuple2';
export * as Tuple3 from './tuple3';
export * as Tuple4 from './tuple4';

export type {
  ArrT,
  DictEntryT,
  DictT,
  EitherT,
  IOT,
  OptionT,
  TaskEitherT,
  TaskT,
  Tuple2T,
  Tuple3T,
  Tuple4T,
};
