import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 8080
const DIST = join(__dirname, 'dist')

const app = express()

// Serve all static assets from dist/ with correct MIME types. express.static properly
// URL-decodes the request path before the filesystem lookup — the previous (implicit,
// undocumented) Railway serving did not, which silently 404'd any asset whose filename
// needed encoding (spaces, Cyrillic — see the 2026-07-27 image-rename fix) and, per
// client report the same day, was dropping images across many blocks on prod.
app.use(
  express.static(DIST, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
      }
    },
  })
)

// SPA fallback — single page, so any unmatched route just returns the app shell.
app.get('*', (_req, res) => res.sendFile(join(DIST, 'index.html')))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
