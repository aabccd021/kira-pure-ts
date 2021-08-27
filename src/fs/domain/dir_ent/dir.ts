import { Dict, Option } from '../../../domain/mod';
import { DirEntT } from './mod';

export * from './dir.g';

export type __ = {
  // eslint-disable-next-line no-use-before-define
  readonly child: Option<Dict<DirEntT>>;
};