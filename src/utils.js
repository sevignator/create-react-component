import { mkdir, readFile, writeFile } from 'node:fs/promises';

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

  const componentTemplate = getComponentTemplate(componentName, lang, styling);
  const indexTemplate = getIndexTemplate(componentName);

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

export async function parseJSONFile(pathString) {
  try {
    const filePath = new URL(pathString, import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(contents);
  } catch (e) {
    console.error(e.message);
  }
}
