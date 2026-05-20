import type { Config } from 'tailwindcss'
// @axevil/design-system — single source of truth for all AXEVIL projects.
// Published from github:marketingwtf135/axevil-design-system and resolved
// from node_modules so the build works in any environment (local, CI, deploy).
const { tokens } = require('@axevil/design-system')

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
