import { writeDirWithPath } from '../fs/write_dir';
import { _, fs, O, T, TO } from '../mod';
import { generateDir } from './get_generated';

export function generate(path: string): Promise<void> {
  return _(path)
    ._(fs.readDirRecursive)
    ._(TO.match(generateDir))
    ._(TO.chainTask(writeDirWithPath(path)))
    ._(T.match(O.compactVoid))
    ._(T.invoke)
    ._v();
}
