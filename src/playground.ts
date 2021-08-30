import { exec } from './child_process/exec';
import { generate } from './codegen/mod';

console.log('generate');
generate('./tempura');
console.log('lint');
exec('yarn lint --fix');
console.log('done');
