import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 8080
const DIST = join(__dirname, 'dist')

const app = express()

// Serve all static assets from dist/ with correct MIME types
app.use(
  express.static(DIST, {
    // Let express.static set the correct Content-Type for every asset
    setHeaders(res, filePath) {
      if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
      }
    },
  })
)

// SPA fallback: any unmatched route under /pdf/pre-ipo-insider/ returns the app shell
app.get('/pdf/pre-ipo-insider/*', (_req, res) => {
  res.sendFile(join(DIST, 'pdf', 'pre-ipo-insider', 'index.html'))
})

// Root and /pdf redirect to the canonical path (mirrors postbuild redirect HTMLs)
app.get('/', (_req, res) => res.redirect(301, '/pdf/pre-ipo-insider/'))
app.get('/pdf', (_req, res) => res.redirect(301, '/pdf/pre-ipo-insider/'))
app.get('/pdf/', (_req, res) => res.redirect(301, '/pdf/pre-ipo-insider/'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
