import { useEffect, useMemo, useRef, useState } from 'react'
import { tokens } from '@axevil/design-system'

/**
 * TokenInspector — DEV-ONLY overlay. Toggle it on, then hover any element on the
 * page to see which AXEVIL design-system tokens it uses: typography (text-* token
 * + size/line-height/weight), colors (text / background / border → token name + hex),
 * border-radius, padding and gap. Resolved values are reverse-mapped back to token
 * names using the live DS `tokens` object.
 *
 * Never rendered in production (mounted behind import.meta.env.DEV in App.tsx).
 */

type AnyTokens = {
  colors?: Record<string, string>
  borderRadius?: Record<string, string>
  spacing?: Record<string, string>
  fontSize?: Record<string, unknown>
  fontWeight?: Record<string, string>
}
const T = tokens as AnyTokens

/* ── helpers ─────────────────────────────────────────── */

function normHex(input: string): string | null {
  const s = input.trim().toLowerCase()
  // rgb()/rgba()
  const m = s.match(/^rgba?\(([^)]+)\)$/)
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean)
    const [r, g, b] = parts
    const a = parts[3]
    if (a !== undefined && parseFloat(a) === 0) return null // fully transparent
    const hex = [r, g, b]
      .map((v) => Math.round(parseFloat(v)).toString(16).padStart(2, '0'))
      .join('')
    return `#${hex}`
  }
  // #rgb / #rrggbb
  if (s.startsWith('#')) {
    let h = s.slice(1)
    if (h.length === 3) h = h.split('').map((c) => c + c).join('')
    if (h.length === 6) return `#${h}`
  }
  return null
}

/** Build hex → [tokenNames] from tokens.colors */
function buildColorMap(): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const [name, val] of Object.entries(T.colors ?? {})) {
    const hex = normHex(String(val))
    if (!hex) continue
    ;(out[hex] ??= []).push(name)
  }
  return out
}

/** rem-string tokens (e.g. '2rem') → [names] */
function buildRemMap(obj: Record<string, string> = {}): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const [name, val] of Object.entries(obj)) {
    const v = String(val).trim()
    if (!v.endsWith('rem')) continue
    const key = parseFloat(v).toString()
    ;(out[key] ??= []).push(name)
  }
  return out
}

const FONT_SIZE_KEYS = Object.keys(
  (tokens as AnyTokens).fontSize ?? {},
) // link, xs, s-med, m, l, paragraph, btn, xl, h1-med, h2 ...

function colorToken(map: Record<string, string[]>, cssValue: string): string | null {
  const hex = normHex(cssValue)
  if (!hex) return null
  const names = map[hex]
  return names ? `${names.join(' / ')}  ${hex}` : hex
}

function remToken(map: Record<string, string[]>, pxValue: string, rootPx: number): string | null {
  const px = parseFloat(pxValue)
  if (!px || Number.isNaN(px)) return null
  const rem = +(px / rootPx).toFixed(4)
  const names = map[rem.toString()]
  const remLabel = `${rem}rem`
  return names ? `${names.join(' / ')}  (${remLabel})` : remLabel
}

function fontSizeTokenFromClasses(el: Element): string | null {
  for (const c of Array.from(el.classList)) {
    if (c.startsWith('text-')) {
      const key = c.slice(5)
      if (FONT_SIZE_KEYS.includes(key)) return c
    }
  }
  return null
}

/** Components that live in the design system (design-system/src/components/*.tsx).
 *  Only these are reported as "Component:"; anything else (local page sections,
 *  host elements) resolves to "none". */
const DS_COMPONENTS = new Set([
  'BgFeatures', 'BtnOwn', 'CtaForm', 'CtaFormNewsletter', 'DescTag', 'FAQ', 'FadeIn',
  'Footer', 'Form', 'HeroEyebrow', 'IllCards', 'Nav', 'NavDropdown', 'PageEntry',
  'Quiz', 'SectionHeading', 'SliderCard', 'StatusPill', 'Tag',
])

/** Walk up to the nearest OWNING component; return its name only if it's a DS component. */
function componentName(el: Element): string | null {
  const key = Object.keys(el).find(
    (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'),
  )
  if (!key) return null
  let fiber: any = (el as any)[key]
  while (fiber) {
    const t = fiber.type
    let name: string | undefined
    if (typeof t === 'function') {
      name = t.displayName || t.name
    } else if (t && typeof t === 'object') {
      // forwardRef / memo wrappers (e.g. framer-motion) — try their inner names
      name = t.displayName || t.render?.displayName || t.render?.name || t.type?.displayName || t.type?.name
    }
    // Skip anonymous / framer-motion wrappers; the first REAL named component is the owner.
    if (name && name.length > 1 && !/^(Unknown|MotionComponent|_c\d*)$/.test(name)) {
      return DS_COMPONENTS.has(name) ? name : null
    }
    fiber = fiber.return
  }
  return null
}

function dsClasses(el: Element): string[] {
  const PREFIXES = ['text-', 'bg-', 'rounded-', 'gap-', 'border-', 'font-', 'max-w-', 'py-', 'px-', 'pt-', 'pb-', 'padding-']
  return Array.from(el.classList).filter((c) => PREFIXES.some((p) => c.startsWith(p)))
}

interface Info {
  comp: string
  tag: string
  rect: DOMRect
  rows: { label: string; value: string }[]
  classes: string[]
}

export default function TokenInspector() {
  const [enabled, setEnabled] = useState(false)
  const [info, setInfo] = useState<Info | null>(null)
  const rafRef = useRef<number | null>(null)

  const colorMap = useMemo(buildColorMap, [])
  const radiusMap = useMemo(() => buildRemMap(T.borderRadius), [])
  const spacingMap = useMemo(() => buildRemMap(T.spacing), [])

  useEffect(() => {
    if (!enabled) { setInfo(null); return }
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16

    function onMove(e: MouseEvent) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (!el || el.closest('#token-inspector-ui')) return
        const cs = getComputedStyle(el)
        const rows: { label: string; value: string }[] = []

        const fontTok = fontSizeTokenFromClasses(el)
        rows.push({
          label: 'Type',
          value: `${fontTok ?? '—'} · ${Math.round(parseFloat(cs.fontSize))}px · lh ${(
            parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 0
          ).toFixed(2)} · w${cs.fontWeight}`,
        })

        const tc = colorToken(colorMap, cs.color)
        if (tc) rows.push({ label: 'Text', value: tc })
        const bc = colorToken(colorMap, cs.backgroundColor)
        if (bc) rows.push({ label: 'Bg', value: bc })

        if (parseFloat(cs.borderTopWidth) > 0) {
          const bcol = colorToken(colorMap, cs.borderTopColor)
          rows.push({ label: 'Border', value: `${cs.borderTopWidth}${bcol ? ' · ' + bcol : ''}` })
        }
        const rad = remToken(radiusMap, cs.borderTopLeftRadius, rootPx)
        if (rad && parseFloat(cs.borderTopLeftRadius) > 0) rows.push({ label: 'Radius', value: rad })

        const gap = remToken(spacingMap, cs.gap === 'normal' ? '0' : cs.columnGap, rootPx)
        if (gap && parseFloat(cs.columnGap) > 0) rows.push({ label: 'Gap', value: gap })

        const padT = parseFloat(cs.paddingTop)
        if (padT > 0) {
          const p = remToken(spacingMap, cs.paddingTop, rootPx)
          rows.push({ label: 'Padding', value: p ?? `${padT}px` })
        }

        setInfo({ comp: componentName(el) ?? 'none', tag: el.tagName.toLowerCase(), rect: el.getBoundingClientRect(), rows, classes: dsClasses(el) })
      })
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, colorMap, radiusMap, spacingMap])

  // Panel position — near cursor-tracked element, flipped away from edges
  const panelStyle: React.CSSProperties = info
    ? (() => {
        const { rect } = info
        const top = rect.bottom + 8 > window.innerHeight - 220 ? Math.max(8, rect.top - 8) : rect.bottom + 8
        const left = Math.min(rect.left, window.innerWidth - 320)
        return { top, left, transform: rect.bottom + 8 > window.innerHeight - 220 ? 'translateY(-100%)' : 'none' }
      })()
    : {}

  return (
    <div id="token-inspector-ui">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        style={{
          position: 'fixed', left: '1rem', bottom: '1rem', zIndex: 2147483647,
          padding: '0.5rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer',
          fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 700,
          background: enabled ? '#4dba79' : '#151515', color: enabled ? '#0a0a0a' : '#fff',
          border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        {enabled ? '● tokens: ON' : '○ tokens'}
      </button>

      {/* Highlight outline */}
      {enabled && info && (
        <div
          style={{
            position: 'fixed', pointerEvents: 'none', zIndex: 2147483646,
            top: info.rect.top, left: info.rect.left, width: info.rect.width, height: info.rect.height,
            outline: '1px solid #4dba79', background: 'rgba(77,186,121,0.08)',
          }}
        />
      )}

      {/* Info panel */}
      {enabled && info && (
        <div
          style={{
            position: 'fixed', pointerEvents: 'none', zIndex: 2147483647,
            width: '20rem', maxWidth: '90vw', ...panelStyle,
            background: 'rgba(10,10,10,0.96)', border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '0.5rem', padding: '0.625rem 0.75rem', backdropFilter: 'blur(8px)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', lineHeight: 1.5, color: '#e6e6e6',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.375rem', alignItems: 'baseline' }}>
            <span style={{ color: info.comp === 'none' ? '#9b9b9b' : '#4dba79', fontWeight: 700 }}>
              Component: {info.comp}
            </span>
            <span style={{ color: '#717171' }}>&lt;{info.tag}&gt;</span>
          </div>
          {info.rows.map((r) => (
            <div key={r.label} style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#9b9b9b', minWidth: '3.5rem', flexShrink: 0 }}>{r.label}</span>
              <span style={{ wordBreak: 'break-word' }}>{r.value}</span>
            </div>
          ))}
          {info.classes.length > 0 && (
            <div style={{ marginTop: '0.375rem', paddingTop: '0.375rem', borderTop: '1px solid rgba(255,255,255,0.12)', color: '#bcbcbc' }}>
              {info.classes.join(' ')}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
