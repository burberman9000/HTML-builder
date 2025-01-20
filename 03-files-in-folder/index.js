const fs = require('fs');
const path = require('path');

const directoryPath = './03-files-in-folder/secret-folder';

fs.readdir(directoryPath, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        const name = path.basename(file, path.extname(file));
        const extention = path.extname(file).slice(1);
        const size = stats.size;
        console.log(`${name} - ${extention} - ${size}`);
      } else if (stats.isDirectory()) {
        console.log(`${file}`);
      }
    });
  });
});
