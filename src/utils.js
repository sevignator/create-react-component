/**
 * Utility functions
 *
 * These function are meant to be program-agnostic and reusable in multiple contexts
 */

import { readFile, stat } from 'node:fs/promises';
import { format } from 'prettier';

// @TODO: Figure out how to properly implement file existence check
// export async function checkIfFileExists(filePath) {
//   return await stat(filePath);
// }

export async function getConfigFile() {
  try {
    const currentWorkingDirectory = process.cwd();
    const filePath = `${currentWorkingDirectory}/.nrc-config.json`;

    return await parseJSONFile(filePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('No config file was found, applying defaults.');
    } else {
      console.log(e);
    }
  }
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

export async function prettify(string, parser = 'babel') {
  const prettifiedText = await format(string, {
    parser,
    semi: true,
    singleQuote: true,
  });
  return prettifiedText;
}
