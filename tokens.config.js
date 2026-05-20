/** @type {import('tailwindcss').Config} */
const tokens = {
  colors: {
    // ── White scale ──────────────────────────
    'white-100': '#ffffff',
    'white-200': '#e6e6e6',
    'white-300': '#bcbcbc',
    'white-400': '#9b9b9b',

    // ── Black scale ──────────────────────────
    'black-100': '#000000',
    'black-200': '#060606',
    'black-300': '#111111',
    'black-400': '#151515',
    'black-500': '#1a1a1a',
    'black-600': '#202020',
    'black-700': '#303030',
    'black-800': '#404040',
    'black-900': '#848484',

    // ── Background ───────────────────────────
    'bg-100': '#080808',

    // ── Outline ──────────────────────────────
    'outline-100': '#151515',

    // ── Semantic UI tokens ───────────────────
    'nav-bg':          '#0a0a0a',
    'section-border':  '#121212',
    'surface-edge':    '#0e0e0e',
    'surface-0':       '#141414',
    'surface-mid':     '#1d1f20',
    'surface-dark':    '#484b4e',
    'border-subtle':   '#1b1b1b',
    'nav-border':      '#171717',
    'btn-border':      '#c9c9c9',

    // ── Status ───────────────────────────────
    'status-open':   '#4dba79',
    'status-closed': '#990003',
    'status-soon':   '#a15e00',

    // ── Accents ──────────────────────────────
    'accent-teal':       '#175e6e',
    'accent-teal-light': '#d7ffff',
    'accent-blue':       '#546fef',
    'lime-accent':       '#F5FD5A',

    // ── Legacy aliases (backward compat) ─────
    'neutral-00':   '#ffffff',
    'neutral-30':   '#b7b7b7',
    'neutral-35':   '#8f8f8f',
    'neutral-40':   '#717171',
    'neutral-50':   '#797980',
    'page-bg':      '#080808',
    'phone-bg':     '#060606',
    'surface-1':    '#151515',
    'surface-2':    '#1a1a1a',
    'surface-3':    '#2a2a2a',
    'surface-4':    '#2b2b2b',
    'card-fill':    '#080808',
    'tag-inactive': '#151515',
    'tag-active':   '#ffffff',
    'btn-label':    '#2b2b2b',
    'gradient-end': '#717171',
  },

  fontFamily: {
    'inter-tight': ['"Inter Tight"', 'sans-serif'],
  },

  fontSize: {
    'text-s-med':  ['0.875rem', { lineHeight: '1',    letterSpacing: '0' }],
    'text-s-semi': ['0.875rem', { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
    'text-m':      ['1rem',     { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
    'text-l':      ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
    'text-btn':    ['1.125rem', { lineHeight: '1.1',  letterSpacing: '0' }],
    'text-xl':     ['1.25rem',  { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
    'h5':          ['1.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
    'h4':          ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '0' }],
    'h3':          ['3rem',     { lineHeight: '1',    letterSpacing: '-0.02em' }],
    'h2':          ['4rem',     { lineHeight: '1',    letterSpacing: '-0.02em' }],
    'h1-med':      ['5.5rem',   { lineHeight: '1',    letterSpacing: '-0.02em' }],
    'h1-semi':     ['5.5rem',   { lineHeight: '1',    letterSpacing: '-0.02em' }],
  },

  fontWeight: {
    'medium':   '500',
    'semibold': '600',
  },

  borderRadius: {
    'border-r-0.25':   '0.25rem',
    'border-r-0.75':   '0.75rem',
    'border-r-1':      '1rem',
    'border-r-2':      '2rem',
    'border-r-3':      '3rem',
    'border-r-4':      '4rem',
    'border-r-2.625':  '2.625rem',
    'border-r-1.9375': '1.9375rem',
    // legacy
    'dot':         '0.25rem',
    'card':        '2rem',
    'card-lg':     '3rem',
    'section':     '4rem',
    'phone':       '2.625rem',
    'phone-inner': '1.9375rem',
  },

  maxWidth: {
    'container-large':  '120rem',
    'container-medium': '90rem',
    // legacy
    'canvas':  '120rem',
    'content': '90rem',
  },

  spacing: {
    'spacing-0.25': '0.25rem',
    'spacing-0.5':  '0.5rem',
    'spacing-0.75': '0.75rem',
    'spacing-1':    '1rem',
    'spacing-1.5':  '1.5rem',
    'spacing-2':    '2rem',
    'spacing-2.25': '2.25rem',
    'spacing-3':    '3rem',
    'spacing-4':    '4rem',
    'spacing-7.5':  '7.5rem',
    'spacing-15':   '15rem',
    // legacy
    'logo-gap':     '2.25rem',
    '13':           '3.25rem',
    '15':           '3.75rem',
    'section-y':    '7.5rem',
    'content-edge': '15rem',
  },

  borderWidth: {
    '3': '3px',
    '8': '8px',
  },
}

module.exports = { tokens }
