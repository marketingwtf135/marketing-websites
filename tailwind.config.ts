import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'page-bg':    '#080808',
        'nav-bg':     '#0a0a0a',
        'phone-bg':   '#060606',
        'nav-border': '#171717',
        'neutral-00': '#ffffff',
        'neutral-30': '#b7b7b7',
        'neutral-35': '#8f8f8f',
        'neutral-40': '#717171',
        'surface-3':  '#2a2a2a',
        'border-subtle': '#1b1b1b',
        'status-open':   '#4dba79',
        'btn-label':     '#2b2b2b',
        'btn-border':    '#c9c9c9',
      },
      fontFamily: {
        'inter-tight': ['"Inter Tight"', 'sans-serif'],
      },
      fontSize: {
        'text-s-med':  ['0.875rem', { lineHeight: '1', letterSpacing: '0' }],
        'text-s-semi': ['0.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'text-m':      ['1rem',     { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'text-l':      ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        'text-xl':     ['1.25rem',  { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h5':          ['1.5rem',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h4':          ['2.25rem',  { lineHeight: '1.2', letterSpacing: '0' }],
        'h3':          ['3rem',     { lineHeight: '1',   letterSpacing: '-0.02em' }],
        'h2':          ['4rem',     { lineHeight: '1',   letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        'content': '90rem',
      },
    },
  },
  plugins: [],
}

export default config
