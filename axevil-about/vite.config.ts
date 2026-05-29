import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Root-based build so the shared DS components (Nav, BgFeatures, Footer) resolve
// their root-absolute asset paths (/img/..., /icons/...) exactly like the main site.
// The /about URL is handled at the hosting layer (own service/subdomain or proxy).
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: { host: '127.0.0.1' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom'],
  },
  build: { outDir: 'dist', emptyOutDir: true },
})
