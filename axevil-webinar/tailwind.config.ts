import type { Config } from 'tailwindcss'
// @axevil/tokens — single source of truth for all AXEVIL projects
// Tokens live at: Marketing-Websites/packages/tokens/
const { tokens } = require('../../packages/tokens')

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      ...tokens,
    },
  },
  plugins: [],
}

export default config
