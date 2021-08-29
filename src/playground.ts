import { readDirRecursive } from './fs/mod';
import { T } from './mod';
import { _ } from './ts/pipe';

async function main(): Promise<void> {
  return _('./src')
    ._(readDirRecursive)
    ._(T.match((x) => JSON.stringify(x, undefined, 2)))
    ._(T.chain(T.log))
    ._(T.invoke)
    ._v();
}

main();
