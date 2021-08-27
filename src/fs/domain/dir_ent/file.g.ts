import { FileT } from './mod';

export function from(content: string): FileT {
  return { _type: 'File', content };
}
