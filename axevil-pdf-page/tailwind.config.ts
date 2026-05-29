import type { Config } from 'tailwindcss'
// @axevil/design-system — single source of truth for all AXEVIL projects
// Update: npm install marketingwtf135/axevil-design-system
const { tokens } = require('@axevil/design-system')

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@axevil/design-system/dist/**/*.{js,cjs}'],
  theme: {
    extend: {
      ...tokens,
    },
  },
  plugins: [],
}

export default config
