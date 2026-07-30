// rolldown 1.2.1 repro
//
// a bare `return;` (or `return undefined`, `void 0`, `null`) as the last
// statement of a labeled block is dropped, reaching should-be-unreachable code

import { build } from 'rolldown';
import { readFileSync } from 'node:fs';

async function check(inputFilename, commentary) {
  console.log();
  console.log(`###############`);
  console.log(`# ${commentary}`);
  console.log(`#`);
  console.log(`# input code (${inputFilename}):`);
  console.log();
  console.log(readFileSync(inputFilename, 'utf-8'));
  console.log();
  console.log('# code after rolldown build:');
  console.log();
  let rolled = await build({ input: [inputFilename] });
  console.log(rolled.output[0].code);
}

await check('repro-bare-return.js', 'REPRO: return is dropped, we reach unreachable code');

await check('ok-no-label.js', 'UNAFFECTED: unlabelled block\'s return is kept');

await check('ok-valued-return.js', 'UNAFFECTED: valued return is kept');
