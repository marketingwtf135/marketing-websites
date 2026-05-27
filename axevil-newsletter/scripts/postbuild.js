// Post-build: drop redirect HTMLs at dist root and dist/pdf so legacy URLs
// (m.axevil.com/ and m.axevil.com/pdf) bounce to the canonical /pdf/pre-ipo-insider/.
// Run automatically after `vite build` via package.json.
import { mkdirSync, writeFileSync } from 'node:fs'

const TARGET = '/pdf/pre-ipo-insider/'
const REDIRECT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <meta http-equiv="refresh" content="0; url=${TARGET}">
  <link rel="canonical" href="${TARGET}">
  <meta name="robots" content="noindex">
</head>
<body>
  <p>Redirecting to <a href="${TARGET}">${TARGET}</a>…</p>
  <script>window.location.replace(${JSON.stringify(TARGET)})</script>
</body>
</html>
`

mkdirSync('dist/pdf', { recursive: true })
writeFileSync('dist/index.html', REDIRECT_HTML)
writeFileSync('dist/pdf/index.html', REDIRECT_HTML)

console.log('[postbuild] wrote redirect HTMLs:')
console.log('  dist/index.html      ->', TARGET)
console.log('  dist/pdf/index.html  ->', TARGET)
