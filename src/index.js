#!/usr/bin/env node

import { Option, program } from 'commander';
import { createTemplate, getConfig } from './helpers.js';
import { parseJSONFile } from './utils.js';

const { version } = await parseJSONFile('../package.json');
const langOptions = ['js', 'ts'];
const stylingOptions = ['vanilla-extract'];

program
  .version(version)
  .argument('<component-name>', 'new component name')
  .addOption(new Option('-d, --dir <path>', 'specify an output directory'))
  .addOption(
    new Option('-l, --lang <language>', 'specify a language to use').choices(
      langOptions
    )
  )
  .addOption(
    new Option('-s, --styling <library>', 'specify a styling library').choices(
      stylingOptions
    )
  )
  .parse();

const options = program.opts();
const { dir, lang, styling } = await getConfig(options);
const componentName = program.args[0];
const componentDirectory = `${dir}/${componentName}`;

createTemplate(componentName, componentDirectory, lang, styling);
