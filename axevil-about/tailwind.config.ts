import type { Config } from 'tailwindcss'
const { tokens } = require('@axevil/design-system')

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@axevil/design-system/dist/**/*.{js,cjs}'],
  theme: { extend: { ...tokens } },
  plugins: [],
}
export default config
