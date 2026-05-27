import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Site is served at m.axevil.com/pdf/pre-ipo-insider/ — physical nesting so
 * the URL maps to a real folder on disk and Railway static serve resolves it
 * directly without needing SPA fallback rules.
 *
 * - `base`: all generated asset URLs (script src, CSS href, /img/*) get the
 *   `/pdf/pre-ipo-insider/` prefix
 * - `build.outDir`: app builds into dist/pdf/pre-ipo-insider/
 * - `scripts/postbuild.js` writes redirect HTMLs at dist/ root and dist/pdf/
 *   so legacy URLs (m.axevil.com/, m.axevil.com/pdf) meta-refresh to the canonical
 */
export default defineConfig({
  base: '/pdf/pre-ipo-insider/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'dist/pdf/pre-ipo-insider',
    emptyOutDir: true,
  },
})
