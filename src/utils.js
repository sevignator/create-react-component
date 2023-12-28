/**
 * Utility functions
 *
 * These function are meant to be program-agnostic and reusable in multiple contexts
 */

import { access, constants, readFile } from 'node:fs/promises';
import { format } from 'prettier';

export async function checkIfFileExists(filePath) {
  try {
    await access(filePath, constants.R_OK | constants.W_OK);
    console.log('This file already exists!');
    process.exit(0);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('Creating this file...');
    } else {
      console.log(e.message);
    }
  }
}

export async function getConfigFile() {
  try {
    const currentWorkingDirectory = process.cwd();
    return await parseJSONFile(`${currentWorkingDirectory}/.nrc-config.json`);
  } catch (e) {
    console.error(e.message);
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
