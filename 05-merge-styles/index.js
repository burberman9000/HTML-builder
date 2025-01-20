const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(outputFile, '', 'utf8');

fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading styles directory:', err);
    return;
  }

  const cssContents = [];

  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const filePath = path.join(stylesDir, file.name);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        cssContents.push(data);

        if (
          cssContents.length ===
          files.filter((f) => f.isFile() && path.extname(f.name) === '.css')
            .length
        ) {
          fs.writeFile(outputFile, cssContents.join('\n'), 'utf8', (err) => {
            if (err) {
              console.error('Error writing to bundle.css:', err);
            } else {
              console.log('bundle.css created successfully!');
            }
          });
        }
      });
    }
  });
});
