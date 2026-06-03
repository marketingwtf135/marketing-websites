const path = require('path')
const fs = require('fs')
const http = require('http')

const PORT = parseInt(process.env.PORT || '4173')
const DIST = path.join(__dirname, 'dist')

// Default landing — also the redirect target for unknown paths.
const DEFAULT_WEBINAR_PATH = '/webinar/2026-06-04'

// Registry of webinar landings on this single deploy.
// Key   = public URL path.
// Value = HTML file to serve, relative to dist/.
// Add a new entry here (plus its built HTML in dist/) to publish another webinar.
const WEBINARS = {
  '/webinar/2026-06-04': 'index.html',
  '/webinar/2026-06-09': 'webinar/2026-06-09/index.html',
}

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

  // Normalize trailing slash
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    urlPath = urlPath.slice(0, -1)
  }

  const ext = path.extname(urlPath).toLowerCase()

  // Serve static assets (JS, CSS, images, fonts, etc.) from dist/
  if (ext) {
    const filePath = path.join(DIST, urlPath)
    // Guard against path traversal outside dist/.
    if (filePath.startsWith(DIST) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      fs.createReadStream(filePath).pipe(res)
      return
    }
  }

  // Serve the matching webinar landing.
  const page = WEBINARS[urlPath]
  if (page) {
    const file = path.join(DIST, page)
    if (fs.existsSync(file)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      fs.createReadStream(file).pipe(res)
      return
    }
  }

  // Redirect everything else to the default webinar landing.
  // Use 302 (temporary) + no-store so browsers/CDNs never *permanently* cache a
  // fallback redirect for a path that may later become a real webinar page.
  res.writeHead(302, { Location: DEFAULT_WEBINAR_PATH, 'Cache-Control': 'no-store' })
  res.end()
}).listen(PORT, '0.0.0.0', () => {
  console.log('Axevil Webinars → m.axevil.app')
  Object.keys(WEBINARS).forEach(p => console.log(`  • ${p}`))
})
