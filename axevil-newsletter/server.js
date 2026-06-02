import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 8080
const DIST = join(__dirname, 'dist/pdf/pre-ipo-insider')
const INDEX = join(DIST, 'index.html')

// Serve static assets with correct MIME types
app.use('/pdf/pre-ipo-insider', express.static(DIST, { index: false }))

// SPA fallback — any request that isn't a real file returns index.html
app.get('*', (_req, res) => {
  res.sendFile(INDEX)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] listening on http://0.0.0.0:${PORT}`)
})
