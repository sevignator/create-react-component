import { stat } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

import { getTemplate } from './templates.js';

export function checkIfDirectoryExists(directoryPath) {
  stat(directoryPath, (err, stats) => {
    try {
      if (err) {
        throw err;
      }
      return stats.isDirectory();
    } catch (e) {
      console.error(e.message);
    }
  });
}

export async function createTemplate(componentName, lang, styling) {
  const langs = {
    js: {
      templateExt: 'jsx',
    },
    ts: {
      templateExt: 'tsx',
    },
  };

  const template = getTemplate(componentName, lang, styling);
  await writeFile(`${componentName}.${langs[lang].templateExt}`, template);
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
