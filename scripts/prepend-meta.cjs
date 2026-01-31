const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const metaPath = path.resolve(__dirname, '..', 'src', 'meta.user.js');

// Find the main JS file Parcel produced (assumes single bundle)
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js') && !f.endsWith(".user.js"));
if (files.length === 0) {
  console.error('No JS build output found in dist/. Run parcel build first.');
  process.exit(1);
}
const bundleName = files[0];
const bundlePath = path.join(distDir, bundleName);

const meta = fs.readFileSync(metaPath, 'utf8');
const bundle = fs.readFileSync(bundlePath, 'utf8');

// Output file name you want installed (this is what users will install)
const outFile = path.join(distDir, 'saladuncharmer.user.js');

fs.writeFileSync(outFile, meta + '\n' + bundle, 'utf8');
console.log('Wrote', outFile);