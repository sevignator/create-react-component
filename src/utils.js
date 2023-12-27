/**
 * Utility functions
 *
 * These function are meant to be program-agnostic and reusable in multiple contexts
 */

import { readFile } from 'node:fs/promises';
import { format } from 'prettier';

export async function getConfigFile() {
  const currentPath = process.cwd();
  return await parseJSONFile(`${currentPath}/.nrc-config.json`);
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

export async function prettify(string) {
  try {
    return await format(string, {
      semi: true,
      parser: 'babel',
      singleQuote: true,
    });
  } catch (e) {
    console.error(e.message);
  }
}
