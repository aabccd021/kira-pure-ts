import * as either_left from './either/left/type';
import * as either_right from './either/right/type';

export type RightT<R> = either_right.Type<R> & {
  readonly _tag: 'Right';
};

export type LeftT<R> = either_left.Type<R> & {
  readonly _tag: 'Left';
};

export type EitherT<L, R> = LeftT<L> | RightT<R>;
