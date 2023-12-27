#!/usr/bin/env node

import { Option, program } from 'commander';
import {
  checkIfDirectoryExists,
  createTemplate,
  parseJSONFile,
} from './utils.js';

const { version } = await parseJSONFile('../package.json');
const langOptions = ['js', 'ts'];
const stylingOptions = ['vanilla-extract'];

program
  .version(version)
  .argument('<component-name>', 'new component name')
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

const componentName = program.args[0];
const { lang, styling } = program.opts();

createTemplate(componentName, lang, styling);
