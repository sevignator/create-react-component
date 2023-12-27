import { stat } from 'node:fs';
import { readFile } from 'node:fs/promises';

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

export async function parseJSONFile(pathString) {
  try {
    const filePath = new URL(pathString, import.meta.url);
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    return JSON.parse(contents);
  } catch (e) {
    console.error(e.message);
  }
}
