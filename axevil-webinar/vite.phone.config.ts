import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Separate build for the standalone phone-input island used by the static
 * /webinar/2026-06-09 page. Bundles React + react-international-phone +
 * libphonenumber-js into a single self-contained IIFE written to public/vendor/
 * (committed), so the normal `vite build` ships it via public/ → dist/ without
 * affecting the main June 4 app build.
 *
 * Build with:  npx vite build --config vite.phone.config.ts
 */
export default defineConfig({
  plugins: [react()],
  // outDir lives inside publicDir; disable public-dir copying so the build does
  // not recursively copy public/ into public/vendor/.
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: 'public/vendor',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/standalone/prometheus-phone.tsx'),
      name: 'PrometheusPhone',
      formats: ['iife'],
      fileName: () => 'prometheus-phone.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'prometheus-phone.[ext]',
      },
    },
  },
})
