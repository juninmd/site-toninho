const fs = require('fs');
const path = require('path');

function testDocs() {
  const readmePath = path.join(__dirname, 'README.md');
  if (!fs.existsSync(readmePath)) {
    console.error('Error: README.md file not found!');
    process.exit(1);
  }

  const readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Find all .js, .css, .html files in the root directory
  const rootFiles = fs.readdirSync(__dirname).filter(file => {
    const ext = path.extname(file).toLowerCase();
    const isPublicAsset = ['.js', '.css', '.html'].includes(ext);
    const stat = fs.statSync(path.join(__dirname, file));
    return isPublicAsset && stat.isFile();
  });

  const missingFiles = [];

  for (const file of rootFiles) {
    if (!readmeContent.includes(file)) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    console.error('Documentation Test Failed!');
    console.error('The following .js, .css, or .html files in root are missing from README.md:');
    missingFiles.forEach(file => console.error(` - ${file}`));
    process.exit(1);
  }

  console.log(`Documentation Test Passed: All ${rootFiles.length} (.js, .css, .html) public root files are documented in README.md.`);
}

testDocs();
