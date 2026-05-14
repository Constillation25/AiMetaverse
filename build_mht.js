const fs = require('fs');
const path = require('path');

// Read the HTML and JS files
const htmlPath = path.join(__dirname, 'public', 'index.html');
const jsPath = path.join(__dirname, 'public', 'platform.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Create unique boundaries
const boundary = '----=_Part_Constellation25_' + Date.now();
const jsBoundary = '----=_Part_JS_' + Date.now();

// Build the MHT file
let mhtContent = '';

// MIME Header
mhtContent += 'MIME-Version: 1.0\r\n';
mhtContent += 'Content-Type: multipart/related; type="text/html"; boundary="' + boundary + '"\r\n';
mhtContent += 'X-MimeOLE: Produced By Constellation25 MVP Builder\r\n';
mhtContent += '\r\n';

// Main HTML Part
mhtContent += '--' + boundary + '\r\n';
mhtContent += 'Content-Type: text/html\r\n';
mhtContent += 'Content-Location: index.html\r\n';
mhtContent += 'Content-Transfer-Encoding: quoted-printable\r\n';
mhtContent += '\r\n';

// Embed the JS directly in the HTML for standalone operation
const embeddedHtml = htmlContent.replace(
  '<script src="platform.js"></script>',
  `<script>\n${jsContent}\n</script>`
);

mhtContent += embeddedHtml + '\r\n';

// JS Part (referenced)
mhtContent += '--' + boundary + '\r\n';
mhtContent += 'Content-Type: application/javascript\r\n';
mhtContent += 'Content-Location: platform.js\r\n';
mhtContent += 'Content-Transfer-Encoding: quoted-printable\r\n';
mhtContent += '\r\n';
mhtContent += jsContent + '\r\n';

// End boundary
mhtContent += '--' + boundary + '--\r\n';

// Write the MHT file
const mhtPath = path.join(__dirname, 'constellation25.mht');
fs.writeFileSync(mhtPath, mhtContent, 'utf8');

console.log('✓ Created constellation25.mht');
console.log('  Location:', mhtPath);
console.log('  Size:', fs.statSync(mhtPath).size, 'bytes');
