import { Dict } from '../../../mod';
import { DirEntT, DirT } from './mod';

export function from(child: Dict<DirEntT>): DirT {
  return { _type: 'Dir', child };
}

export function asDirEntFrom(child: Dict<DirEntT>): DirEntT {
  return { _type: 'Dir', child };
}
