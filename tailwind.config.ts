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
      // --- Figma font sizes (site-1920 scale) ---
      fontSize: {
        'text-s-med':   ['14px', { lineHeight: '1', letterSpacing: '0' }],
        'text-s-semi':  ['14px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'text-m':       ['16px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'text-l':       ['18px', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        'text-btn':     ['18px', { lineHeight: '1.1', letterSpacing: '0' }],
        'text-xl':      ['20px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'h5':           ['24px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h4':           ['36px', { lineHeight: '1.2', letterSpacing: '0' }],
        'h3':           ['48px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h2':           ['64px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1-med':       ['88px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h1-semi':      ['88px', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      // --- Figma font weights ---
      fontWeight: {
        'medium':    '500',
        'semibold':  '600',
      },
      // --- Border radius tokens (Figma values) ---
      borderRadius: {
        'dot':          '4px',    // status dot, tiny badge radius
        'card':         '2rem',   // 32px — card inner radius
        'card-lg':      '3rem',   // 48px — logo card, photo card
        'section':      '4rem',   // 64px — section outer rounded border
        'phone':        '42px',   // phone outer dark body
        'phone-inner':  '31px',   // phone screen content clip
      },
      // --- Design width ---
      maxWidth: {
        'canvas': '1920px',
        'content': '1440px',
      },
      // --- Spacing tokens ---
      spacing: {
        'logo-gap': '36px',
        '13': '3.25rem',     // 52px — feature badge / tab height
        '15': '3.75rem',     // 60px — used in Block12 gap
        'section-y': '120px', // section vertical padding (Figma auto-layout)
        'content-edge': '240px', // canvas-to-content gutter (1920 frame)
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
