import type { Config } from 'tailwindcss'
// @axevil/design-system — single source of truth for all AXEVIL projects
// Published from github:marketingwtf135/axevil-design-system, resolved from node_modules.
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
