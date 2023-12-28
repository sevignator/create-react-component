/**
 * Helper functions
 *
 * These functions only make sense in the context of this program
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { checkIfFileExists, getJSONConfigFile } from './utils.js';
import {
  getComponentTemplate,
  getConfigTemplate,
  getIndexTemplate,
} from './templates.js';

const configFileName = '.nrc-config.json';
const defaults = {
  dir: 'app/components',
  lang: 'js',
  styling: null,
};

export async function createBoilerplate(componentName, dir, lang, styling) {
  try {
    const componentFileExtensions = {
      js: 'jsx',
      ts: 'tsx',
    };
    const componentTemplate = await getComponentTemplate(
      componentName,
      lang,
      styling
    );
    const indexTemplate = await getIndexTemplate(componentName);

    if (!componentTemplate || !indexTemplate) {
      throw new Error('Template code could not be found.');
    }

    if (checkIfFileExists(dir)) {
      throw new Error('This component already exists!');
    }

    await mkdir(dir, { recursive: true });
    await writeFile(
      `${dir}/${componentName}.${componentFileExtensions[lang]}`,
      componentTemplate
    );
    await writeFile(`${dir}/index.${lang}`, indexTemplate);
  } catch (e) {
    console.error(e.message);
  }
}

export async function createConfig() {
  try {
    const currentDir = process.cwd();
    const filePath = `${currentDir}/${configFileName}`;
    const configTemplate = await getConfigTemplate(defaults);

    if (!configTemplate) {
      throw new Error('Template code could not be found');
    }

    await writeFile(filePath, configTemplate);
  } catch (e) {
    console.error(e);
  }
}

export async function getOptions(options) {
  try {
    const configFile = await getJSONConfigFile(configFileName);
    return {
      dir: options.dir || configFile?.dir || defaults.dir,
      lang: options.lang || configFile?.lang || defaults.lang,
      styling: options.styling || configFile?.lang || defaults.styling,
    };
  } catch (e) {
    console.error(e);
  }
}
