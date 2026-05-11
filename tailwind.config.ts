import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // --- Figma color tokens ---
      colors: {
        // Base neutrals
        'neutral-00': '#ffffff',
        'neutral-30': '#b7b7b7',
        'neutral-35': '#8f8f8f',
        'neutral-40': '#717171',
        'neutral-50': '#797980',
        'labels-primary': '#000000',
        'bar-border': '#0000004d',
        // Page backgrounds
        'page-bg':        '#080808',
        'nav-bg':         '#0a0a0a',
        'phone-bg':       '#060606',
        'section-border': '#121212',
        'surface-edge':   '#0e0e0e',
        'surface-0':      '#141414',
        'surface-1':      '#151515',
        'surface-2':      '#1a1a1a',
        'surface-mid':    '#1d1f20',
        'surface-3':      '#2a2a2a',
        'surface-4':      '#2b2b2b',
        'surface-dark':   '#484b4e',
        'border-subtle':  '#1b1b1b',
        'nav-border':     '#171717',
        // Button
        'btn-label':      '#2b2b2b',
        'btn-border':     '#c9c9c9',
        // Tags
        'tag-inactive':   '#151515',
        'tag-active':     '#ffffff',
        'card-fill':      '#080808',
        // Status
        'status-open':    '#4dba79',
        'status-closed':  '#990003',
        'status-soon':    '#a15e00',
        // Accents
        'accent-teal':       '#175e6e',
        'accent-teal-light': '#d7ffff',
        'accent-blue':       '#546fef',
        'lime-accent':       '#F5FD5A',
        // Gradients
        'gradient-end':   '#717171',
      },
      // --- Figma font families ---
      fontFamily: {
        'inter-tight': ['"Inter Tight"', 'sans-serif'],
      },
      // --- Figma font sizes in rem (1rem = 16px) ---
      fontSize: {
        'text-s-med':   ['0.875rem', { lineHeight: '1', letterSpacing: '0' }],
        'text-s-semi':  ['0.875rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'text-m':       ['1rem',     { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'text-l':       ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        'text-btn':     ['1.125rem', { lineHeight: '1.1', letterSpacing: '0' }],
        'text-xl':      ['1.25rem',  { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h5':           ['1.5rem',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h4':           ['2.25rem',  { lineHeight: '1.2', letterSpacing: '0' }],
        'h3':           ['3rem',     { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h2':           ['4rem',     { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1-med':       ['5.5rem',   { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1-semi':      ['5.5rem',   { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      // --- Figma font weights ---
      fontWeight: {
        'medium':    '500',
        'semibold':  '600',
      },
      // --- Border radius tokens in rem ---
      borderRadius: {
        'dot':          '0.25rem',  // 4px
        'card':         '2rem',     // 32px
        'card-lg':      '3rem',     // 48px
        'section':      '4rem',     // 64px
        'phone':        '2.625rem', // 42px
        'phone-inner':  '1.9375rem',// 31px
      },
      // --- Design width in rem ---
      maxWidth: {
        'canvas':  '120rem',  // 1920px
        'content': '90rem',   // 1440px
      },
      // --- Spacing tokens in rem ---
      spacing: {
        'logo-gap':     '2.25rem',  // 36px
        '13':           '3.25rem',  // 52px
        '15':           '3.75rem',  // 60px
        'section-y':    '7.5rem',   // 120px
        'content-edge': '15rem',    // 240px
      },
      // --- Border widths (Figma) ---
      borderWidth: {
        '3': '3px',  // section frames, photo cards
        '8': '8px',  // info card double-border
      },
    },
  },
  plugins: [],
}

export default config
