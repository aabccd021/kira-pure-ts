import { DirEntT, EtcT } from './mod.g';

export function create(): EtcT {
  return { _type: 'Etc' };
}

export function createAsDirEnt<T>(): DirEntT<T> {
  return { _type: 'Etc' };
}
