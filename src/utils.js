import * as fs from 'node:fs';

export function checkIfDirectoryExists(directoryPath) {
  fs.stat(directoryPath, (err, stats) => {
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
