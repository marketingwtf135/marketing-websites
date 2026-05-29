import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Served at axevil.com/about — physical nesting so the URL maps to a real folder.
export default defineConfig({
  base: '/about/',
  plugins: [react()],
  server: { host: '127.0.0.1' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom'],
  },
  build: { outDir: 'dist/about', emptyOutDir: true },
})
