/**
 *
 */
export type Right<R> = {
  readonly _tag: 'Right';
  readonly right: R;
};

/**
 *
 */
export type Left<L> = {
  readonly _tag: 'Left';
  readonly errObj: Error;
  readonly left: L;
};

/**
 *
 */
export type Either<L, R> = Left<L> | Right<R>;

/**
 *
 */
export declare type None = {
  readonly _tag: 'None';
};

/**
 *
 */
export declare type Some<S> = {
  readonly _tag: 'Some';
  readonly value: NonNullable<S>;
};

/**
 *
 */
export type Option<S> = None | Some<S>;

/**
 *
 */
export type Task<T> = () => Promise<T>;

/**
 *
 */
export type IO<I> = () => I;

/**
 *
 */
export type TaskEither<L, R> = Task<Either<L, R>>;

/**
 *
 */
export type Reader<D, R> = (r: D) => R;

/**
 *
 */
// eslint-disable-next-line functional/prefer-type-literal
export interface Dict<D> {
  readonly [index: string]: NonNullable<D>;
}

/**
 *
 */
export type DictEntry<D> = readonly [string, NonNullable<D>];

/**
 *
 */
export type Arr<A> = readonly A[];

/**
 *
 */
export type Tuple2<A, B> = readonly [A, B];

/**
 *
 */
export type Tuple3<A, B, C> = readonly [A, B, C];

/**
 *
 */
export type Tuple4<A, B, C, D> = readonly [A, B, C, D];
