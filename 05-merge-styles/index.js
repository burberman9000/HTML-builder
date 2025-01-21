const fs = require('fs').promises;
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const compilatedPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function styleCompiler() {
  try {
    const files = await fs.readdir(stylePath);
    const styles = [];

    for (const file of files) {
      const filePath = path.join(stylePath, file);
      const extension = path.extname(file);

      if (extension === '.css') {
        const data = await fs.readFile(filePath, 'utf-8');
        styles.push(data);
      }
    }

    await fs.writeFile(compilatedPath, styles.join('\n'));
    console.log('Bundle.css was created!');
  } catch (err) {
    console.log('Unable to create bundle.css', err);
  }
}

styleCompiler();
