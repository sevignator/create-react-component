#!/usr/bin/env node

import { Option, program } from 'commander';
import { createTemplate, parseJSONFile } from './utils.js';

const { version } = await parseJSONFile('../package.json');
const langOptions = ['js', 'ts'];
const stylingOptions = ['vanilla-extract'];

program
  .version(version)
  .argument('<component-name>', 'new component name')
  .addOption(
    new Option('-d, --dir <path>', 'specify an output directory').default(
      './src/components'
    )
  )
  .addOption(
    new Option('-l, --lang <language>', 'specify a language to use')
      .choices(langOptions)
      .default(langOptions[0])
  )
  .addOption(
    new Option('-s, --styling <library>', 'specify a styling library').choices(
      stylingOptions
    )
  )
  .parse();

const { dir, lang, styling } = program.opts();
const componentName = program.args[0];
const componentDirectory = `${dir}/${componentName}`;

createTemplate(componentName, componentDirectory, lang, styling);
