import * as fs from 'fs';

import { O, T, TaskOption } from '../mod';

/**
 * returns None if error
 */
export function readFile(path: string): TaskOption<string> {
  return T.from(() =>
    fs.promises
      .readFile(path, 'utf-8')
      .then((val) => O.Some.from(val))
      .catch(() => O.None.create())
  );
}
