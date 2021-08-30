import { writeDirWithPath } from '../fs/write_dir';
import { _, child_process, fs, Option, T, TO } from '../mod';
import { generateDir } from './get_generated';

export function generate(path: string): Promise<Option<Buffer>> {
  return _(path)
    ._(fs.readDirRecursive)
    ._(TO.match(generateDir))
    ._(TO.chainTask(writeDirWithPath(path)))
    ._(TO.chainIO(() => child_process.exec('yarn lint --fix')))
    ._(T.invoke)
    ._v();
}
