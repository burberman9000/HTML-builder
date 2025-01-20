const fs = require('fs').promises;
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

async function buildPage() {
  try {
    await fs.mkdir(projectDistPath, { recursive: true });

    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const components = await loadComponents(templateContent);
    const indexHtml = replaceTemplateTags(templateContent, components);
    await fs.writeFile(path.join(projectDistPath, 'index.html'), indexHtml);

    await compileStyles();

    await copyAssets();

    console.log('Project built successfully!');
  } catch (error) {
    console.error('Error building project:', error);
  }
}

async function loadComponents(templateContent) {
  const componentTags = [
    ...new Set(templateContent.match(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g)),
  ];
  const components = {};

  for (const tag of componentTags) {
    const componentName = tag.replace(/{{\s*|\s*}}/g, '');
    const componentPath = path.join(componentsPath, `${componentName}.html`);

    try {
      const componentContent = await fs.readFile(componentPath, 'utf-8');
      components[componentName] = componentContent;
    } catch {
      console.error(`Component ${componentName} not found.`);
    }
  }

  return components;
}

function replaceTemplateTags(template, components) {
  return template.replace(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g, (match, name) => {
    return components[name] || match;
  });
}

async function compileStyles() {
  const files = await fs.readdir(stylesPath);
  let cssContent = '';

  for (const file of files) {
    if (path.extname(file) === '.css') {
      const filePath = path.join(stylesPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      cssContent += `${fileContent}\n`;
    }
  }

  await fs.writeFile(path.join(projectDistPath, 'style.css'), cssContent);
}

async function copyAssets() {
  const targetAssetsPath = path.join(projectDistPath, 'assets');

  const copyDir = async (src, dest) => {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  };

  await copyDir(assetsPath, targetAssetsPath);
}

buildPage();
