/**
 * Utility functions
 *
 * These function are meant to be program-agnostic and reusable in multiple contexts
 */

import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { format } from 'prettier';

export async function readJSONFile(pathString) {
  try {
    const filePath = new URL(pathString, import.meta.url);

    if (!checkIfFileExists(filePath)) return;

    const contents = await readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(contents);
  } catch (e) {
    console.error(e.message);
  }
}

export async function getJSONConfigFile(fileName) {
  try {
    const currentWorkingDirectory = process.cwd();
    const filePath = `${currentWorkingDirectory}/${fileName}`;
    return await readJSONFile(filePath);
  } catch (e) {
    console.error(e.message);
  }
}

export async function prettify(string, parser = 'babel') {
  try {
    return await format(string, {
      parser,
      semi: true,
      singleQuote: true,
    });
  } catch (e) {
    console.error(e.message);
  }
}

export function checkIfFileExists(filePath) {
  return existsSync(filePath);
}
