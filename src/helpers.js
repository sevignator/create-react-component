/**
 * Helper functions
 *
 * These functions only make sense in the context of this program
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { getConfigFile } from './utils.js';
import { getComponentTemplate, getIndexTemplate } from './templates.js';

export async function createTemplate(componentName, directory, lang, styling) {
  const fileExtensions = {
    js: {
      component: 'jsx',
      index: 'js',
      styling: 'js',
    },
    ts: {
      component: 'tsx',
      index: 'ts',
      styling: 'ts',
    },
  };

  const componentTemplate = await getComponentTemplate(
    componentName,
    lang,
    styling
  );

  const indexTemplate = await getIndexTemplate(componentName);

  await mkdir(directory, { recursive: true });
  await writeFile(
    `${directory}/${componentName}.${fileExtensions[lang].component}`,
    componentTemplate
  );
  await writeFile(
    `${directory}/index.${fileExtensions[lang].index}`,
    indexTemplate
  );
}

export async function getOptions(options) {
  const configFile = getConfigFile();
  const defaults = {
    dir: 'app/components',
    lang: 'js',
    styling: null,
  };

  return {
    dir: options.dir || configFile?.dir || defaults.dir,
    lang: options.lang || configFile?.lang || defaults.lang,
    styling: options.styling || configFile?.lang || defaults.styling,
  };
}