#!/usr/bin/env node

import { Option, program } from 'commander';
import { checkIfDirectoryExists, parseJSONFile } from './utils.js';

const { version } = await parseJSONFile('../package.json');

program
  .version(version)
  .argument('<component-name>', 'new component name')
  .option('--typescript', 'create files using the `.ts` and `.tsx` extensions')
  .addOption(
    new Option('--styling <choice>', 'specify a styling library').choices([
      'vanilla-extract',
    ])
  )
  .parse();

const componentName = program.args[0];
const options = program.opts();

console.log({
  componentName,
  options,
});
