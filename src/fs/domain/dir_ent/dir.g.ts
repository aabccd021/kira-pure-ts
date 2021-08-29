import { Dict } from '../../../mod';
import { DirEntT, DirT } from './mod';

export function from(child: Dict<DirEntT>): DirT {
  return { _type: 'Dir', child };
}

export function asDirEntFrom(child: Dict<DirEntT>): DirEntT {
  return { _type: 'Dir', child };
}

export type Fn<T> = (dir: DirT) => T;

export function copy({
  child,
}: {
  readonly child?: (p: Dict<DirEntT>) => Dict<DirEntT>;
}): Fn<DirT> {
  return (dir) => ({
    _type: 'Dir',
    child: child?.(dir.child) ?? dir.child,
  });
}

export function copyOf(
  dir: DirT
): (p: { readonly child?: (p: Dict<DirEntT>) => Dict<DirEntT> }) => DirT {
  return ({ child }) => ({
    _type: 'Dir',
    child: child?.(dir.child) ?? dir.child,
  });
}
