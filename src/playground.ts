import { exec } from './child_process/exec';
import { generate } from './codegen/mod';

async function main(): Promise<void> {
  console.log('generate');
  await generate('./tempura');
  console.log('lint');
  exec('yarn eslint --fix tempura')();
  console.log('done');
}

main();
