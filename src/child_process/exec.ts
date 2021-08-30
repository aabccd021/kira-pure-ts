import * as child_process from 'child_process';

import { IO } from '../mod';

export function exec(command: string): IO<Buffer> {
  return () => child_process.execSync(command);
}
