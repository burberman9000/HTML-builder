const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.promises.mkdir(targetDir, { recursive: true });
  } catch (err) {
    console.error('Error creating target directory:', err);
    return;
  }

  try {
    const files = await fs.promises.readdir(sourceDir);

    for (const file of files) {
      const srcFile = path.join(sourceDir, file);
      const destFile = path.join(targetDir, file);

      await fs.promises.copyFile(srcFile, destFile);
    }

    console.log('Directory copied successfully!');
  } catch (err) {
    console.error('Error reading or copying files:', err);
  }
}

copyDir();
