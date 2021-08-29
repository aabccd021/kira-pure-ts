import * as fs from 'fs';

import { T, Task } from '../mod';

export function writeFile(path: string, data: string): Task<void> {
  return T.from(() => fs.promises.writeFile(path, data));
}

export function writeFileWithPath(path: string): (data: string) => Task<void> {
  return (data) => writeFile(path, data);
}
