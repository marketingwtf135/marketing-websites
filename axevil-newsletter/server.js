// Simple static file server for the Axevil-Newsletter SPA.
// Serves files from dist/ with correct MIME types and falls back to
// dist/pdf/pre-ipo-insider/index.html for any path that doesn't match a
// real file (SPA routing support).

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, 'dist')
const SPA_INDEX = path.join(DIST_DIR, 'pdf', 'pre-ipo-insider', 'index.html')
const PORT = process.env.PORT || 8080

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.map':  'application/json; charset=utf-8',
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

const server = http.createServer((req, res) => {
  // Strip query string and decode URI
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  const filePath = path.join(DIST_DIR, urlPath)

  // Security: prevent path traversal outside dist/
  if (!filePath.startsWith(DIST_DIR + path.sep) && filePath !== DIST_DIR) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      // Exact file match — serve it with the correct MIME type
      res.writeHead(200, { 'Content-Type': getMimeType(filePath) })
      fs.createReadStream(filePath).pipe(res)
      return
    }

    // No real file found — serve the SPA entry point so client-side routing works
    fs.stat(SPA_INDEX, (idxErr, idxStats) => {
      if (idxErr || !idxStats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not found')
        return
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      fs.createReadStream(SPA_INDEX).pipe(res)
    })
  })
})

server.listen(PORT, () => {
  console.log(`[server] listening on http://0.0.0.0:${PORT}`)
  console.log(`[server] serving dist/ from ${DIST_DIR}`)
  console.log(`[server] SPA fallback -> ${SPA_INDEX}`)
})
