import { Dict, Option } from '../../../domain/mod';
import { DirEntT, DirT } from './mod';

export function from(child: Option<Dict<DirEntT>>): DirT {
  return { _type: 'Dir', child };
}
