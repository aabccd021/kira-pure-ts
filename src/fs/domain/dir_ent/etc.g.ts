import { DirEntT, EtcT } from './mod.g';

export function from(): EtcT {
  return { _type: 'Etc' };
}

export function asDirEntFrom(): DirEntT {
  return { _type: 'Etc' };
}
