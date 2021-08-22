import { _ } from './function';
import * as O from './option';
import * as P from './tuple';
import { Either, Left, Option, Right, Tuple2, Tuple3, Tuple4 } from './type';

/**
 *
 */
export function right<R>(right: R): Right<R> {
  return { _tag: 'Right', right };
}

/**
 *
 */
export function rightE<L, R>(right: R): Either<L, R> {
  return { _tag: 'Right', right };
}

/**
 *
 */
export function left<L>(left: L): Left<L> {
  return {
    _tag: 'Left',
    errObj: new Error(),
    left,
  };
}

/**
 *
 */
export type Fn<L, R, T> = (e: Either<L, R>) => T;

/**
 *
 */
export function match<L, R, T>(
  onLeft: (l: Left<L>) => T,
  onRight: (r: Right<R>) => T
): Fn<L, R, T> {
  return (e) => (e._tag === 'Left' ? onLeft(e) : onRight(e));
}

/**
 *
 */
export function map<L, R, RResult>(f: (a: R) => RResult): Fn<L, R, Either<L, RResult>> {
  return match<L, R, Either<L, RResult>>(
    (l) => l,
    (x) => right(f(x.right))
  );
}

/**
 *
 */
export function mapLeft<L, R, LResult>(f: (l: L) => LResult): Fn<L, R, Either<LResult, R>> {
  return match<L, R, Either<LResult, R>>(
    (l) => ({ _tag: 'Left', errObj: l.errObj, left: f(l.left) }),
    (r) => r
  );
}

/**
 *
 */
export function fold<L, R, T>(onLeft: (e: L) => T, onRight: (a: R) => T): Fn<L, R, T> {
  return match<L, R, T>(
    (l) => onLeft(l.left),
    (r) => onRight(r.right)
  );
}

/**
 *
 */
export function getOrElse<L, R>(f: (l: L) => R): Fn<L, R, R> {
  return fold(f, (r) => r);
}

/**
 *
 */
export function toOption<L, R>(e: Either<L, NonNullable<R>>): Option<R> {
  return _(e)
    ._(map((r) => O.some(r)))
    ._(getOrElse<L, Option<R>>(() => O.none))
    ._v();
}

/**
 *
 */
export function chain<L, R, RResult>(
  f: (r: R) => Either<L, RResult>
): Fn<L, R, Either<L, RResult>> {
  return (e) =>
    _(e)
      ._(map(f))
      ._(
        match(
          (l) => l,
          (r) => r.right
        )
      )
      ._v();
}

/**
 *
 */
export function map2<L, A, B, T>(f: (a: A, b: B) => T): Fn<L, Tuple2<A, B>, Either<L, T>> {
  return map(P.map2(f));
}

/**
 *
 */
export function map3<L, A, B, C, T>(
  f: (a: A, b: B, c: C) => T
): Fn<L, Tuple3<A, B, C>, Either<L, T>> {
  return map(P.map3(f));
}

/**
 *
 */
export function map4<L, A, B, C, D, T>(
  f: (a: A, b: B, c: C, d: D) => T
): Fn<L, Tuple4<A, B, C, D>, Either<L, T>> {
  return map(P.map4(f));
}
