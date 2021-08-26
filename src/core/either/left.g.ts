import { E } from '../mod';
import { from, Type } from './left';

export * from './left';

export type _<R> = Type<R> & {
  readonly _tag: 'Left';
};

export function asEitherFrom<L>(left: L): E._<L, unknown> {
  return from(left);
}
