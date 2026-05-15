const path = require('path')
const fs = require('fs')
const http = require('http')

const PORT = parseInt(process.env.PORT || '4173')
const DIST = path.join(__dirname, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.mp4':  'video/mp4',
  '.json': 'application/json',
}

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]

  // Remove trailing slash except root
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    urlPath = urlPath.slice(0, -1)
  }

  const filePath = path.join(DIST, urlPath)
  const ext = path.extname(filePath).toLowerCase()

  // Serve static file if it exists
  if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  // SPA fallback — always serve index.html
  const index = path.join(DIST, 'index.html')
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  fs.createReadStream(index).pipe(res)
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Axevil Webinar running on port ${PORT}`)
})
