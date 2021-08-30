import { Dict } from '../../../mod';
import { DirEntT } from './mod';

export * from './dir.g';

export type __<T> = {
  // eslint-disable-next-line no-use-before-define
  readonly child: Dict<DirEntT<T>>;
};
