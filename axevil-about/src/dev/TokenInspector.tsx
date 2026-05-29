import { useEffect, useMemo, useRef, useState } from 'react'
import { tokens } from '@axevil/design-system'

/**
 * TokenInspector — DEV-ONLY overlay (mounted behind import.meta.env.DEV).
 *
 * HOVER (when ON): highlights the element under the cursor and shows its AXEVIL
 * design-system tokens (typography / colors / radius / spacing) + which DS
 * component owns it (or "none").
 *
 * CLICK (when ON): freezes the selection and opens a Figma-like picker:
 *   · search the DS component list to SWAP this element to a DS component
 *   · pick variant props (Size / Type / State / Icon …) from the component schema
 *   · "Copy for chat" → puts a precise instruction (with file:line) on the clipboard
 *     for Claude to apply as a real, persistent code change.
 */

type AnyTokens = {
  colors?: Record<string, string>
  borderRadius?: Record<string, string>
  spacing?: Record<string, string>
  fontSize?: Record<string, unknown>
}
const T = tokens as AnyTokens

/* ── DS components (design-system/src/components/*.tsx) ── */
const DS_COMPONENTS = [
  'BgFeatures', 'BtnOwn', 'CtaForm', 'CtaFormNewsletter', 'DescTag', 'FAQ', 'FadeIn',
  'Footer', 'Form', 'HeroEyebrow', 'IllCards', 'Nav', 'NavDropdown', 'PageEntry',
  'Quiz', 'SectionHeading', 'SliderCard', 'StatusPill', 'Tag',
]
const DS_SET = new Set(DS_COMPONENTS)

/* ── Variant schema per DS component (from each component's prop types) ── */
type Field = { prop: string; options: string[] }
const VARIANT_SCHEMA: Record<string, Field[]> = {
  BtnOwn: [
    { prop: 'size', options: ['L', 'M', 'S', 'XS'] },
    { prop: 'variant', options: ['primary', 'secondary'] },
    { prop: 'hideIcon', options: ['true', 'false'] },
  ],
  StatusPill: [{ prop: 'status', options: ['open', 'closed', 'soon'] }],
  Tag: [
    { prop: 'variant', options: ['tab', 'regulatory', 'plain'] },
    { prop: 'size', options: ['sm', 'md', 'lg'] },
    { prop: 'active', options: ['true', 'false'] },
  ],
  SectionHeading: [{ prop: 'align', options: ['start', 'center'] }],
  IllCards: [{ prop: 'titleSize', options: ['h3', 'h4'] }],
  BgFeatures: [
    { prop: 'spotlight', options: ['true', 'false'] },
    { prop: 'ambientOpacity', options: ['0.25', '0.5', '1'] },
  ],
}

/* ── helpers ─────────────────────────────────────────── */
function normHex(input: string): string | null {
  const s = input.trim().toLowerCase()
  const m = s.match(/^rgba?\(([^)]+)\)$/)
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean)
    if (parts[3] !== undefined && parseFloat(parts[3]) === 0) return null
    return '#' + parts.slice(0, 3).map((v) => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('')
  }
  if (s.startsWith('#')) {
    let h = s.slice(1)
    if (h.length === 3) h = h.split('').map((c) => c + c).join('')
    if (h.length === 6) return `#${h}`
  }
  return null
}
function buildColorMap(): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const [name, val] of Object.entries(T.colors ?? {})) {
    const hex = normHex(String(val)); if (!hex) continue
    ;(out[hex] ??= []).push(name)
  }
  return out
}
function buildRemMap(obj: Record<string, string> = {}): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const [name, val] of Object.entries(obj)) {
    const v = String(val).trim(); if (!v.endsWith('rem')) continue
    ;(out[parseFloat(v).toString()] ??= []).push(name)
  }
  return out
}
const FONT_SIZE_KEYS = Object.keys(T.fontSize ?? {})
function colorToken(map: Record<string, string[]>, css: string): string | null {
  const hex = normHex(css); if (!hex) return null
  const names = map[hex]; return names ? `${names.join(' / ')}  ${hex}` : hex
}
function remToken(map: Record<string, string[]>, pxValue: string, rootPx: number): string | null {
  const px = parseFloat(pxValue); if (!px || Number.isNaN(px)) return null
  const rem = +(px / rootPx).toFixed(4)
  const names = map[rem.toString()]
  return names ? `${names.join(' / ')}  (${rem}rem)` : `${rem}rem`
}
function fontSizeTokenFromClasses(el: Element): string | null {
  for (const c of Array.from(el.classList)) {
    if (c.startsWith('text-') && FONT_SIZE_KEYS.includes(c.slice(5))) return c
  }
  return null
}
function dsClasses(el: Element): string[] {
  const P = ['text-', 'bg-', 'rounded-', 'gap-', 'border-', 'font-', 'max-w-', 'py-', 'px-', 'pt-', 'pb-', 'padding-']
  return Array.from(el.classList).filter((c) => P.some((p) => c.startsWith(p)))
}
function fiberOf(el: Element): any {
  const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'))
  return key ? (el as any)[key] : null
}
function componentName(el: Element): string | null {
  let fiber = fiberOf(el)
  while (fiber) {
    const t = fiber.type
    let name: string | undefined
    if (typeof t === 'function') name = t.displayName || t.name
    else if (t && typeof t === 'object') name = t.displayName || t.render?.displayName || t.render?.name || t.type?.displayName || t.type?.name
    if (name && name.length > 1 && !/^(Unknown|MotionComponent|_c\d*)$/.test(name)) {
      return DS_SET.has(name) ? name : null
    }
    fiber = fiber.return
  }
  return null
}
/** nearest authored source location (file:line) from the fiber chain */
function sourceOf(el: Element): string | null {
  let fiber = fiberOf(el)
  while (fiber) {
    const s = fiber._debugSource
    if (s?.fileName) {
      const short = s.fileName.split(/[\\/]/).slice(-2).join('/')
      return `${short}:${s.lineNumber}`
    }
    fiber = fiber.return
  }
  return null
}

interface HoverInfo { comp: string; tag: string; rect: DOMRect; rows: { label: string; value: string }[]; classes: string[] }
interface Selected { comp: string; tag: string; source: string; rect: DOMRect }

export default function TokenInspector() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState<HoverInfo | null>(null)
  const [sel, setSel] = useState<Selected | null>(null)
  const [search, setSearch] = useState('')
  const [target, setTarget] = useState<string | null>(null)        // chosen DS component to swap to
  const [variants, setVariants] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const rafRef = useRef<number | null>(null)

  const colorMap = useMemo(buildColorMap, [])
  const radiusMap = useMemo(() => buildRemMap(T.borderRadius), [])
  const spacingMap = useMemo(() => buildRemMap(T.spacing), [])

  // HOVER tracking (suspended while a selection is frozen)
  useEffect(() => {
    if (!enabled || sel) { if (!enabled) setHover(null); return }
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    function onMove(e: MouseEvent) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (!el || el.closest('#token-inspector-ui')) return
        const cs = getComputedStyle(el)
        const rows: { label: string; value: string }[] = []
        const fontTok = fontSizeTokenFromClasses(el)
        rows.push({ label: 'Type', value: `${fontTok ?? '—'} · ${Math.round(parseFloat(cs.fontSize))}px · lh ${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 0).toFixed(2)} · w${cs.fontWeight}` })
        const tc = colorToken(colorMap, cs.color); if (tc) rows.push({ label: 'Text', value: tc })
        const bc = colorToken(colorMap, cs.backgroundColor); if (bc) rows.push({ label: 'Bg', value: bc })
        if (parseFloat(cs.borderTopWidth) > 0) { const b = colorToken(colorMap, cs.borderTopColor); rows.push({ label: 'Border', value: `${cs.borderTopWidth}${b ? ' · ' + b : ''}` }) }
        if (parseFloat(cs.borderTopLeftRadius) > 0) { const r = remToken(radiusMap, cs.borderTopLeftRadius, rootPx); if (r) rows.push({ label: 'Radius', value: r }) }
        if (parseFloat(cs.columnGap) > 0) { const g = remToken(spacingMap, cs.columnGap, rootPx); if (g) rows.push({ label: 'Gap', value: g }) }
        if (parseFloat(cs.paddingTop) > 0) rows.push({ label: 'Padding', value: remToken(spacingMap, cs.paddingTop, rootPx) ?? cs.paddingTop })
        setHover({ comp: componentName(el) ?? 'none', tag: el.tagName.toLowerCase(), rect: el.getBoundingClientRect(), rows, classes: dsClasses(el) })
      })
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => { document.removeEventListener('mousemove', onMove); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [enabled, sel, colorMap, radiusMap, spacingMap])

  // CLICK to freeze selection (capture phase, intercept page interactions)
  useEffect(() => {
    if (!enabled) return
    function onClick(e: MouseEvent) {
      const el = e.target as Element | null
      if (!el || el.closest('#token-inspector-ui')) return // let picker UI clicks through
      e.preventDefault(); e.stopPropagation()
      const target = document.elementFromPoint(e.clientX, e.clientY)
      if (!target) return
      const comp = componentName(target) ?? 'none'
      setSel({ comp, tag: target.tagName.toLowerCase(), source: sourceOf(target) ?? '—', rect: target.getBoundingClientRect() })
      setTarget(DS_SET.has(comp) ? comp : null)
      setVariants({}); setSearch(''); setCopied(false)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [enabled])

  function close() { setSel(null); setTarget(null); setVariants({}); setSearch('') }

  function instruction(): string {
    if (!sel) return ''
    const props = Object.entries(variants).filter(([, v]) => v !== '')
    const propStr = props.length ? ' ' + props.map(([k, v]) => `${k}=${v}`).join(' ') : ''
    if (target && target !== sel.comp) {
      return `DS picker → at ${sel.source}: replace the element currently rendered by ${sel.comp === 'none' ? `host <${sel.tag}>` : `<${sel.comp}>`} with the design-system <${target}${propStr} /> (keep its content/children).`
    }
    if (target && props.length) {
      return `DS picker → at ${sel.source}: on <${target}>, set props {${props.map(([k, v]) => `${k}: ${v}`).join(', ')}}.`
    }
    return `DS picker → at ${sel.source}: element is ${sel.comp === 'none' ? `host <${sel.tag}> (not a DS component)` : `<${sel.comp}>`} — choose a DS component or variant.`
  }

  async function copy() {
    try { await navigator.clipboard.writeText(instruction()); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* noop */ }
  }

  const filtered = DS_COMPONENTS.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
  const schema = target ? VARIANT_SCHEMA[target] : undefined
  const activeRect = sel?.rect ?? hover?.rect

  const panelBase: React.CSSProperties = {
    position: 'fixed', zIndex: 2147483647, width: '21rem', maxWidth: '92vw',
    background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '0.625rem',
    fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', lineHeight: 1.5, color: '#e6e6e6',
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
  }
  const pos = activeRect
    ? { top: Math.min(activeRect.bottom + 8, window.innerHeight - 24), left: Math.min(activeRect.left, window.innerWidth - 340) }
    : {}

  return (
    <div id="token-inspector-ui">
      <button type="button" onClick={() => { setEnabled((v) => !v); close() }}
        style={{ position: 'fixed', left: '1rem', bottom: '1rem', zIndex: 2147483647, padding: '0.5rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 700, background: enabled ? '#4dba79' : '#151515', color: enabled ? '#0a0a0a' : '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
        {enabled ? '● tokens: ON' : '○ tokens'}
      </button>

      {/* highlight */}
      {enabled && activeRect && (
        <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 2147483646, top: activeRect.top, left: activeRect.left, width: activeRect.width, height: activeRect.height, outline: `2px solid ${sel ? '#546fef' : '#4dba79'}`, background: sel ? 'rgba(84,111,239,0.10)' : 'rgba(77,186,121,0.08)' }} />
      )}

      {/* HOVER token panel (no selection) */}
      {enabled && !sel && hover && (
        <div style={{ ...panelBase, pointerEvents: 'none', padding: '0.625rem 0.75rem', ...pos }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.375rem', alignItems: 'baseline' }}>
            <span style={{ color: hover.comp === 'none' ? '#9b9b9b' : '#4dba79', fontWeight: 700 }}>Component: {hover.comp}</span>
            <span style={{ color: '#717171' }}>&lt;{hover.tag}&gt;</span>
          </div>
          {hover.rows.map((r) => (
            <div key={r.label} style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#9b9b9b', minWidth: '3.5rem', flexShrink: 0 }}>{r.label}</span>
              <span style={{ wordBreak: 'break-word' }}>{r.value}</span>
            </div>
          ))}
          {hover.classes.length > 0 && <div style={{ marginTop: '0.375rem', paddingTop: '0.375rem', borderTop: '1px solid rgba(255,255,255,0.12)', color: '#bcbcbc' }}>{hover.classes.join(' ')}</div>}
          <div style={{ marginTop: '0.375rem', color: '#717171' }}>click to pick a DS component →</div>
        </div>
      )}

      {/* PICKER (selection frozen) */}
      {enabled && sel && (
        <div style={{ ...panelBase, pointerEvents: 'auto', ...pos }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.625rem', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <span><span style={{ color: sel.comp === 'none' ? '#9b9b9b' : '#4dba79', fontWeight: 700 }}>{sel.comp}</span> <span style={{ color: '#717171' }}>&lt;{sel.tag}&gt;</span></span>
            <button type="button" onClick={close} style={{ background: 'none', border: 'none', color: '#9b9b9b', cursor: 'pointer', fontSize: '14px' }}>✕</button>
          </div>
          <div style={{ padding: '0.5rem 0.625rem', color: '#717171', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{sel.source}</div>

          {/* Swap: search + list */}
          <div style={{ padding: '0.5rem 0.625rem' }}>
            <div style={{ color: '#9b9b9b', marginBottom: '0.375rem' }}>Swap to DS component:</div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search components…"
              style={{ width: '100%', padding: '0.375rem 0.5rem', borderRadius: '0.375rem', background: '#151515', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'inherit', fontSize: '11px', marginBottom: '0.375rem' }} />
            <div style={{ maxHeight: '8rem', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {filtered.map((c) => (
                <button key={c} type="button" onClick={() => { setTarget(c); setVariants({}) }}
                  style={{ padding: '0.25rem 0.5rem', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', background: target === c ? '#546fef' : '#1a1a1a', color: target === c ? '#fff' : '#bcbcbc', border: '1px solid rgba(255,255,255,0.12)' }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Variants */}
          {schema && (
            <div style={{ padding: '0.5rem 0.625rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ color: '#9b9b9b', marginBottom: '0.375rem' }}>{target} variants:</div>
              {schema.map((f) => (
                <div key={f.prop} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#bcbcbc', minWidth: '5rem', flexShrink: 0 }}>{f.prop}</span>
                  <select value={variants[f.prop] ?? ''} onChange={(e) => setVariants((v) => ({ ...v, [f.prop]: e.target.value }))}
                    style={{ flex: 1, padding: '0.25rem 0.375rem', borderRadius: '0.375rem', background: '#151515', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'inherit', fontSize: '11px' }}>
                    <option value="">—</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Instruction preview + copy */}
          <div style={{ padding: '0.5rem 0.625rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ color: '#717171', marginBottom: '0.375rem', wordBreak: 'break-word' }}>{instruction()}</div>
            <button type="button" onClick={copy}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, background: copied ? '#4dba79' : '#fff', color: '#0a0a0a', border: 'none' }}>
              {copied ? '✓ copied — paste into chat' : 'Copy for chat'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
