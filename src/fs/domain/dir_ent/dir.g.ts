import { Dict } from '../../../mod';
import { DirEntT, DirT } from './mod';

export function create<T>(child: Dict<DirEntT<T>>): DirT<T> {
  return { _type: 'Dir', child };
}

export function createAsDirEnt<T>(child: Dict<DirEntT<T>>): DirEntT<T> {
  return { _type: 'Dir', child };
}

export type Fn<T, TResult> = (dir: DirT<T>) => TResult;

export function copy<T>({
  child,
}: {
  readonly child?: (p: Dict<DirEntT<T>>) => Dict<DirEntT<T>>;
}): Fn<T, DirT<T>> {
  return (dir) => ({
    _type: 'Dir',
    child: child?.(dir.child) ?? dir.child,
  });
}

export function copyOf<T>(
  dir: DirT<T>
): (p: {
  readonly child?: (p: Dict<DirEntT<T>>) => Dict<DirEntT<T>>;
}) => DirT<T> {
  return ({ child }) => ({
    _type: 'Dir',
    child: child?.(dir.child) ?? dir.child,
  });
}
