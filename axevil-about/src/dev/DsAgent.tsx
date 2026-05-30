import React, { useEffect, useMemo, useRef, useState } from 'react'
import { tokens } from '@axevil/design-system'
import * as DS from '@axevil/design-system/components'
import { IconCopyAlt, IconTrashAlt } from 'agentation'

/**
 * ds-agent — DEV-ONLY design inspector + DS component/variant picker + comment
 * composer. Its own chrome is styled with the AXEVIL design system (Inter Tight,
 * DS color/radius/spacing tokens) so it feels native. Mounted behind import.meta.env.DEV.
 */

type AnyTokens = { colors?: Record<string, string>; borderRadius?: Record<string, string>; spacing?: Record<string, string>; fontSize?: Record<string, unknown> }
const T = tokens as AnyTokens

/* ── DS-styled UI primitives ── */
const FONT = "'Inter Tight', sans-serif"
const ACCENT = 'var(--status-open)'      // accent = AXEVIL green
const BLUE = 'var(--accent-blue)'        // #546fef (selection)
const C = {
  panel: 'rgba(8,8,8,0.97)', surface: 'var(--black-400)', surface2: 'var(--black-500)', deep: 'var(--bg-100)',
  border: 'var(--border-subtle)', borderStrong: 'rgba(255,255,255,0.14)',
  text: 'var(--white-100)', text2: 'var(--white-300)', text3: 'var(--white-400)', faint: 'rgba(255,255,255,0.35)',
}
const RAD = { sm: '0.5rem', md: '0.75rem', lg: '1rem' }
const sBtnPrimary: React.CSSProperties = { padding: '0.4375rem 1rem', borderRadius: RAD.sm, fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', background: 'var(--white-100)', color: 'var(--black-600)', border: 'none', cursor: 'pointer' }
const sBtnOutline: React.CSSProperties = { ...sBtnPrimary, background: 'transparent', color: C.text, border: `1px solid ${C.borderStrong}` }
const sBtnAccent: React.CSSProperties = { ...sBtnPrimary, background: ACCENT, color: 'var(--black-600)' }
const sBtnGhost: React.CSSProperties = { ...sBtnPrimary, background: 'transparent', color: C.text2, border: 'none' }
const sField: React.CSSProperties = { width: '100%', padding: '0.5rem 0.625rem', borderRadius: RAD.sm, background: C.surface, border: `1px solid ${C.borderStrong}`, color: C.text, fontFamily: FONT, fontSize: '0.8125rem', letterSpacing: '-0.02em', outline: 'none' }
const iconBtn = (active: boolean): React.CSSProperties => ({ width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: RAD.md, cursor: 'pointer', background: active ? ACCENT : C.surface, color: active ? 'var(--black-600)' : C.text, border: `1px solid ${C.borderStrong}`, boxShadow: '0 4px 16px rgba(0,0,0,0.4)' })

const FOLDERS: Record<string, string[]> = {
  Blocks: ['Nav', 'Footer', 'CtaForm', 'CtaFormNewsletter', 'Form', 'FAQ', 'BgFeatures', 'PageEntry', 'Quiz'],
  Elements: ['BtnOwn', 'StatusPill', 'Tag', 'DescTag', 'HeroEyebrow', 'SectionHeading', 'FadeIn', 'NavDropdown'],
  Cards: ['IllCards', 'SliderCard'],
  Icons: [],
}
const DS_SET = new Set(Object.values(FOLDERS).flat())
const ICONS = [
  'Arrow-down-1', 'Arrow-down', 'Arrow-up-shadow', 'Arrow-up', 'Book', 'Download', 'Email', 'Fast', 'Key', 'Lock',
  'Mail', 'Minus', 'Money', 'Notes', 'Plus', 'Profile-shadow', 'Search', 'Security', 'Source-shadow', 'Source',
  'Time', 'Track', 'True-innactive', 'True', 'User', 'Users', 'analytics-big-icon', 'btn-dot', 'graphic-big-icon',
  'icon-eclipse-btn', 'icon-eclipse', 'icon-money-case', 'icon-persons', 'icon-search', 'icon-source', 'icon-track',
  'internet-big-icon', 'portfolio-big-icon', 'profile-big-icon', 'rocket-big-icon', 'security-big-icon',
  'slider-buttons-left', 'slider-buttons-right',
]
type Field = { prop: string; options: string[] }
const VARIANT_SCHEMA: Record<string, Field[]> = {
  BtnOwn: [{ prop: 'size', options: ['L', 'M', 'S', 'XS'] }, { prop: 'variant', options: ['primary', 'secondary'] }, { prop: 'hideIcon', options: ['true', 'false'] }],
  StatusPill: [{ prop: 'status', options: ['open', 'closed', 'soon'] }],
  Tag: [{ prop: 'variant', options: ['tab', 'regulatory', 'plain'] }, { prop: 'size', options: ['sm', 'md', 'lg'] }, { prop: 'active', options: ['true', 'false'] }],
  SectionHeading: [{ prop: 'align', options: ['start', 'center'] }],
  IllCards: [{ prop: 'titleSize', options: ['h3', 'h4'] }],
  BgFeatures: [{ prop: 'spotlight', options: ['true', 'false'] }, { prop: 'ambientOpacity', options: ['0.25', '0.5', '1'] }],
}
const ICON_PROP = new Set(['BtnOwn'])
const PREVIEWABLE = new Set(['BtnOwn', 'StatusPill', 'Tag', 'DescTag', 'HeroEyebrow', 'SectionHeading', 'IllCards'])
const SAMPLE: Record<string, { props?: Record<string, unknown>; children?: React.ReactNode }> = {
  BtnOwn: { props: { hideIcon: true }, children: 'Button' },
  StatusPill: { props: { status: 'open', label: 'Open' } },
  Tag: { props: { variant: 'regulatory', label: 'Tag' } },
  DescTag: { props: { number: '1.0', label: 'Label' } },
  HeroEyebrow: { children: 'Open' },
  SectionHeading: { props: { number: '1.0', label: 'Label', title: 'Heading' } },
  IllCards: { props: { cards: [{ num: '1.0', img: '/img/ill/ill-legal-01.png', title: 'Card', body: 'Sample body.' }] } },
}

/* token helpers */
function normHex(input: string): string | null {
  const s = input.trim().toLowerCase()
  const m = s.match(/^rgba?\(([^)]+)\)$/)
  if (m) { const p = m[1].split(/[\s,/]+/).filter(Boolean); if (p[3] !== undefined && parseFloat(p[3]) === 0) return null; return '#' + p.slice(0, 3).map((v) => Math.round(parseFloat(v)).toString(16).padStart(2, '0')).join('') }
  if (s.startsWith('#')) { let h = s.slice(1); if (h.length === 3) h = h.split('').map((c) => c + c).join(''); if (h.length === 6) return `#${h}` }
  return null
}
function buildColorMap() { const o: Record<string, string[]> = {}; for (const [n, v] of Object.entries(T.colors ?? {})) { const h = normHex(String(v)); if (h) (o[h] ??= []).push(n) } return o }
function buildRemMap(obj: Record<string, string> = {}) { const o: Record<string, string[]> = {}; for (const [n, v] of Object.entries(obj)) { const s = String(v).trim(); if (s.endsWith('rem')) (o[parseFloat(s).toString()] ??= []).push(n) } return o }
const FONT_SIZE_KEYS = Object.keys(T.fontSize ?? {})
function colorToken(map: Record<string, string[]>, css: string) { const h = normHex(css); if (!h) return null; const n = map[h]; return n ? `${n.join(' / ')}  ${h}` : h }
function remToken(map: Record<string, string[]>, px: string, root: number) { const v = parseFloat(px); if (!v) return null; const rem = +(v / root).toFixed(4); const n = map[rem.toString()]; return n ? `${n.join(' / ')}  (${rem}rem)` : `${rem}rem` }
function fontTokFromClasses(el: Element) { for (const c of Array.from(el.classList)) if (c.startsWith('text-') && FONT_SIZE_KEYS.includes(c.slice(5))) return c; return null }
function dsClasses(el: Element) { const P = ['text-', 'bg-', 'rounded-', 'gap-', 'border-', 'font-', 'max-w-', 'py-', 'px-', 'pt-', 'pb-', 'padding-']; return Array.from(el.classList).filter((c) => P.some((p) => c.startsWith(p))) }
function fiberOf(el: Element): any { const k = Object.keys(el).find((x) => x.startsWith('__reactFiber$') || x.startsWith('__reactInternalInstance$')); return k ? (el as any)[k] : null }
function fiberName(f: any): string | undefined { const t = f?.type; if (!t) return undefined; if (typeof t === 'function') return t.displayName || t.name; if (typeof t === 'object') return t.displayName || t.render?.displayName || t.render?.name || t.type?.displayName || t.type?.name; return undefined }
function componentName(el: Element): string | null { let f = fiberOf(el); while (f) { const n = fiberName(f); if (n && n.length > 1 && !/^(Unknown|MotionComponent|_c\d*)$/.test(n)) return DS_SET.has(n) ? n : null; f = f.return } return null }
function componentPath(el: Element): string[] { const out: string[] = []; let f = fiberOf(el); while (f) { const n = fiberName(f); if (n && n.length > 1 && /^[A-Z]/.test(n) && !/^(Unknown|MotionComponent|_c\d*)$/.test(n) && out[0] !== n) out.unshift(n); f = f.return } return out.slice(-5) }
function sourceOf(el: Element): string | null { let f = fiberOf(el); while (f) { const s = f._debugSource; if (s?.fileName) return `${s.fileName.split(/[\\/]/).slice(-2).join('/')}:${s.lineNumber}`; f = f.return } return null }
function computeRows(el: Element, root: number) {
  const cs = getComputedStyle(el); const rows: { label: string; value: string }[] = []; const cm = buildColorMap()
  rows.push({ label: 'Type', value: `${fontTokFromClasses(el) ?? '—'} · ${Math.round(parseFloat(cs.fontSize))}px · lh ${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 0).toFixed(2)} · w${cs.fontWeight}` })
  const tc = colorToken(cm, cs.color); if (tc) rows.push({ label: 'Text', value: tc })
  const bc = colorToken(cm, cs.backgroundColor); if (bc) rows.push({ label: 'Bg', value: bc })
  if (parseFloat(cs.borderTopWidth) > 0) { const b = colorToken(cm, cs.borderTopColor); rows.push({ label: 'Border', value: `${cs.borderTopWidth}${b ? ' · ' + b : ''}` }) }
  if (parseFloat(cs.borderTopLeftRadius) > 0) { const r = remToken(buildRemMap(T.borderRadius), cs.borderTopLeftRadius, root); if (r) rows.push({ label: 'Radius', value: r }) }
  if (parseFloat(cs.columnGap) > 0) { const g = remToken(buildRemMap(T.spacing), cs.columnGap, root); if (g) rows.push({ label: 'Gap', value: g }) }
  if (parseFloat(cs.paddingTop) > 0) rows.push({ label: 'Padding', value: remToken(buildRemMap(T.spacing), cs.paddingTop, root) ?? cs.paddingTop })
  return rows
}
function parseVal(v: string): unknown { if (v === 'true') return true; if (v === 'false') return false; if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v); return v }
function viewportLabel(w: number) { return w >= 1024 ? 'Desktop' : w >= 640 ? 'Tablet' : 'Mobile' }

class PreviewBoundary extends React.Component<{ children: React.ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? <span style={{ color: C.faint }}>preview unavailable</span> : this.props.children }
}

function Dropdown({ value, options, placeholder, onChange }: { value: string; options: string[]; placeholder: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ ...sField, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: open ? BLUE : C.borderStrong, color: value ? C.text : C.faint, cursor: 'pointer' }}>
        <span>{value || placeholder}</span><span style={{ color: C.faint, transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 0.25rem)', left: 0, right: 0, zIndex: 10, background: C.surface2, border: `1px solid ${C.borderStrong}`, borderRadius: RAD.sm, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', maxHeight: '10rem', overflowY: 'auto' }}>
          <button type="button" onClick={() => { onChange(''); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0.625rem', background: 'none', border: 'none', color: C.faint, cursor: 'pointer', fontFamily: FONT, fontSize: '0.8125rem' }}>—</button>
          {options.map((o) => (<button key={o} type="button" onClick={() => { onChange(o); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem 0.625rem', background: value === o ? BLUE : 'none', border: 'none', color: value === o ? '#fff' : C.text2, cursor: 'pointer', fontFamily: FONT, fontSize: '0.8125rem' }}>{o}</button>))}
        </div>
      )}
    </div>
  )
}

function IconField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false); const [q, setQ] = useState('')
  const list = ICONS.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ ...sField, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.375rem', borderColor: open ? BLUE : C.borderStrong, color: value ? C.text : C.faint, cursor: 'pointer' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>{value && <img src={`/icons/${value}.svg`} alt="" style={{ width: '0.875rem', height: '0.875rem', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />}{value || 'choose icon'}</span>
        <span style={{ color: C.faint, transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 0.25rem)', left: 0, right: 0, zIndex: 10, background: C.surface2, border: `1px solid ${C.borderStrong}`, borderRadius: RAD.sm, padding: '0.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="search icons…" style={{ ...sField, marginBottom: '0.5rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.375rem', maxHeight: '10rem', overflowY: 'auto' }}>
            {list.map((ic) => (<button key={ic} type="button" title={ic} onClick={() => { onChange(ic); setOpen(false) }} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: RAD.sm, cursor: 'pointer', background: value === ic ? BLUE : C.surface, border: `1px solid ${C.border}`, padding: '0.25rem' }}><img src={`/icons/${ic}.svg`} alt={ic} style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /></button>))}
            {list.length === 0 && <span style={{ gridColumn: '1 / -1', color: C.faint }}>no icons</span>}
          </div>
        </div>
      )}
    </div>
  )
}

interface HoverInfo { comp: string; tag: string; rect: DOMRect; rows: { label: string; value: string }[]; classes: string[] }
interface Selected { comp: string; tag: string; source: string; rect: DOMRect; rows: { label: string; value: string }[]; classes: string[]; path: string[] }
interface Edit { viewport: string; text: string; action?: 'comment' | 'swap' | 'variant'; file?: string; component?: string; target?: string; props?: Record<string, string>; note?: string }

const Row = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: C.text3, minWidth: '4rem', flexShrink: 0 }}>{label}</span><span style={{ wordBreak: 'break-word', color: C.text2 }}>{value}</span></div>
)

export default function DsAgent() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState<HoverInfo | null>(null)
  const [sel, setSel] = useState<Selected | null>(null)
  const [expand, setExpand] = useState(false)
  const [comment, setComment] = useState('')
  const [folder, setFolder] = useState('Elements')
  const [search, setSearch] = useState('')
  const [target, setTarget] = useState<string | null>(null)
  const [variants, setVariants] = useState<Record<string, string>>({})
  const [icon, setIcon] = useState('')
  const [edits, setEdits] = useState<Edit[]>(() => { try { return JSON.parse(localStorage.getItem('ds-agent:' + location.pathname) || '[]') } catch { return [] } })
  const [copied, setCopied] = useState(false)
  const rafRef = useRef<number | null>(null)
  const selElRef = useRef<Element | null>(null)

  const colorMap = useMemo(buildColorMap, [])
  const radiusMap = useMemo(() => buildRemMap(T.borderRadius), [])
  const spacingMap = useMemo(() => buildRemMap(T.spacing), [])

  useEffect(() => {
    if (!enabled || sel) { if (!enabled) setHover(null); return }
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    function onMove(e: MouseEvent) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (!el || el.closest('#ds-agent-ui')) return
        setHover({ comp: componentName(el) ?? 'none', tag: el.tagName.toLowerCase(), rect: el.getBoundingClientRect(), rows: computeRows(el, root), classes: dsClasses(el) })
      })
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => { document.removeEventListener('mousemove', onMove); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [enabled, sel, colorMap, radiusMap, spacingMap])

  useEffect(() => {
    if (!enabled) return
    function onClick(e: MouseEvent) {
      const el = e.target as Element | null
      if (!el || el.closest('#ds-agent-ui')) return
      e.preventDefault(); e.stopPropagation()
      const tgt = document.elementFromPoint(e.clientX, e.clientY); if (!tgt) return
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      const comp = componentName(tgt) ?? 'none'
      selElRef.current = tgt
      setSel({ comp, tag: tgt.tagName.toLowerCase(), source: sourceOf(tgt) ?? '—', rect: tgt.getBoundingClientRect(), rows: computeRows(tgt, root), classes: dsClasses(tgt), path: componentPath(tgt) })
      setTarget(DS_SET.has(comp) ? comp : null); setVariants({}); setIcon(''); setSearch(''); setComment(''); setExpand(false); setCopied(false)
      if (DS_SET.has(comp)) { const fo = Object.keys(FOLDERS).find((f) => FOLDERS[f].includes(comp)); if (fo) setFolder(fo) }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [enabled])

  // persist the edits queue per page so reloads don't lose work
  useEffect(() => { try { localStorage.setItem('ds-agent:' + location.pathname, JSON.stringify(edits)) } catch { /* noop */ } }, [edits])
  // hotkeys: ` or Alt+D toggle · Esc deselect
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null
      const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')
      if (!typing && (e.key === '`' || (e.altKey && (e.key === 'd' || e.key === 'D')))) { e.preventDefault(); setEnabled((v) => !v); setSel(null) }
      if (e.key === 'Escape' && enabled) setSel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled])

  // Re-track the frozen selection on scroll/resize so the panel + highlight follow
  // the element (and don't drift off-screen). Drops the selection if it's gone.
  useEffect(() => {
    if (!sel) return
    function reflow() {
      const el = selElRef.current
      if (!el || !el.isConnected) return
      const r = el.getBoundingClientRect()
      setSel((s) => (s ? { ...s, rect: r } : s))
    }
    window.addEventListener('scroll', reflow, { passive: true, capture: true })
    window.addEventListener('resize', reflow)
    return () => { window.removeEventListener('scroll', reflow, true); window.removeEventListener('resize', reflow) }
  }, [sel?.comp, sel?.source])

  function close() { selElRef.current = null; setSel(null); setTarget(null); setVariants({}); setIcon(''); setSearch(''); setComment(''); setExpand(false) }
  function swapInstruction(): string {
    if (!sel) return ''
    const props = Object.entries(variants).filter(([, v]) => v !== '')
    if (icon) props.push(['icon', `/icons/${icon}.svg`])
    const propStr = props.length ? ' ' + props.map(([k, v]) => `${k}=${v}`).join(' ') : ''
    if (target && target !== sel.comp) return `at ${sel.source}: replace ${sel.comp === 'none' ? `host <${sel.tag}>` : `<${sel.comp}>`} with DS <${target}${propStr} /> (keep content).`
    if (target && props.length) return `at ${sel.source}: on <${target}>, set props {${props.map(([k, v]) => `${k}: ${v}`).join(', ')}}.`
    return ''
  }
  function pushEdit(partial: Omit<Edit, 'viewport'>) { if (!sel) return; setEdits((e) => [...e, { viewport: viewportLabel(window.innerWidth), ...partial }]); close() }
  function saveComment() { if (!sel || !comment.trim()) return; pushEdit({ action: 'comment', file: sel.source, note: comment.trim(), text: `at ${sel.source} (${sel.path.join(' › ') || sel.tag}): ${comment.trim()}` }) }
  function saveSwap() {
    const t = swapInstruction(); if (!t || !sel) return
    const props: Record<string, string> = { ...variants }; if (icon) props.icon = `/icons/${icon}.svg`
    pushEdit({ action: target && target !== sel.comp ? 'swap' : 'variant', file: sel.source, component: sel.comp, target: target ?? undefined, props, note: comment.trim() || undefined, text: comment.trim() ? `${t} — note: ${comment.trim()}` : t })
  }
  async function copyAll() {
    const human = edits.map((e, i) => `${i + 1}. [${e.viewport}] ${e.text}`).join('\n\n')
    const json = JSON.stringify(edits.map(({ viewport, action, file, component, target, props, note }) => ({ viewport, action, file, component, target, props, note })), null, 2)
    const out = human + '\n\n```json\n' + json + '\n```'
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* noop */ }
  }

  const list = folder === 'Icons' ? [] : FOLDERS[folder].filter((c) => c.toLowerCase().includes(search.toLowerCase()))
  const schema = target ? VARIANT_SCHEMA[target] : undefined
  const activeRect = sel?.rect ?? hover?.rect
  // Keep the panel fully inside the viewport: prefer below the element, flip above
  // if it would overflow the bottom, then clamp so it never crosses top/bottom/sides.
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [panelH, setPanelH] = useState(360)
  useEffect(() => { const h = panelRef.current?.offsetHeight; if (h && Math.abs(h - panelH) > 2) setPanelH(h) })
  const pos: React.CSSProperties = (() => {
    if (!activeRect) return {}
    const M = 12
    const w = panelRef.current?.offsetWidth ?? Math.min(window.innerWidth * 0.92, 304)
    const h = Math.min(panelH, window.innerHeight - 2 * M)
    let left = Math.max(M, Math.min(activeRect.left, window.innerWidth - w - M))
    let top = activeRect.bottom + 8
    if (top + h > window.innerHeight - M) top = activeRect.top - 8 - h // not enough room below → flip above
    top = Math.max(M, Math.min(top, window.innerHeight - h - M))     // final clamp inside viewport
    return { top, left }
  })()
  const panelBase: React.CSSProperties = { position: 'fixed', zIndex: 2147483647, width: '19rem', maxWidth: '92vw', maxHeight: '76vh', overflowY: 'auto', background: C.panel, border: `1px solid ${C.border}`, borderRadius: RAD.md, fontFamily: FONT, fontSize: '0.75rem', lineHeight: 1.45, letterSpacing: '-0.01em', color: C.text2, boxShadow: '0 1rem 2.5rem rgba(0,0,0,0.6)', backdropFilter: 'blur(0.75rem)' }
  const label: React.CSSProperties = { color: C.text3, marginBottom: '0.375rem', fontSize: '0.6875rem' }

  let preview: React.ReactNode = null
  if (target && PREVIEWABLE.has(target) && (DS as any)[target]) {
    const Comp = (DS as any)[target]; const base = SAMPLE[target] || {}
    const vprops = Object.fromEntries(Object.entries(variants).filter(([, v]) => v !== '').map(([k, v]) => [k, parseVal(v)]))
    const props: Record<string, unknown> = { ...base.props, ...vprops }
    if (icon && target === 'BtnOwn') { props.icon = `/icons/${icon}.svg`; props.hideIcon = false }
    preview = <PreviewBoundary key={`${target}|${JSON.stringify(props)}`}><div style={{ transform: 'scale(0.72)', transformOrigin: 'top left' }}><Comp {...props}>{base.children}</Comp></div></PreviewBoundary>
  }

  return (
    <div id="ds-agent-ui">
      {/* launcher */}
      <div style={{ position: 'fixed', left: '1.25rem', bottom: '1.25rem', zIndex: 2147483647, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button type="button" onClick={() => { setEnabled((v) => !v); close() }} title="ds-agent"
          style={{ position: 'relative', padding: '0.5rem 0.875rem', borderRadius: RAD.sm, cursor: 'pointer', fontFamily: FONT, fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '-0.02em', background: enabled ? ACCENT : C.surface, color: enabled ? 'var(--black-600)' : C.text, border: `1px solid ${C.borderStrong}`, boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.5)' }}>
          ds-agent
          {edits.length > 0 && <span style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', minWidth: '1.25rem', height: '1.25rem', padding: '0 0.3125rem', borderRadius: '999px', background: ACCENT, color: 'var(--black-600)', fontSize: '0.6875rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '0.125rem solid var(--bg-100)' }}>{edits.length}</span>}
        </button>
        {edits.length > 0 && (
          <>
            <button type="button" title="copy all edits" onClick={copyAll} style={iconBtn(copied)}><IconCopyAlt size={16} /></button>
            <button type="button" title="delete all" onClick={() => setEdits([])} style={iconBtn(false)}><IconTrashAlt size={16} /></button>
          </>
        )}
      </div>

      {/* highlight */}
      {enabled && activeRect && <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 2147483646, top: activeRect.top, left: activeRect.left, width: activeRect.width, height: activeRect.height, outline: `2px solid ${sel ? BLUE : ACCENT}`, borderRadius: '0.125rem', background: sel ? 'rgba(84,111,239,0.10)' : 'rgba(77,186,121,0.10)' }} />}

      {/* hover token panel */}
      {enabled && !sel && hover && (
        <div ref={panelRef} style={{ ...panelBase, pointerEvents: 'none', padding: '0.625rem 0.75rem', ...pos }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'baseline' }}><span style={{ color: hover.comp === 'none' ? C.text3 : ACCENT, fontWeight: 600 }}>Component: {hover.comp}</span><span style={{ color: C.faint }}>&lt;{hover.tag}&gt;</span></div>
          {hover.rows.map((r) => <Row key={r.label} label={r.label} value={r.value} />)}
          <div style={{ marginTop: '0.5rem', color: C.faint }}>click to comment / pick a DS component →</div>
        </div>
      )}

      {/* picker + comment composer */}
      {enabled && sel && (
        <div ref={panelRef} style={{ ...panelBase, pointerEvents: 'auto', ...pos }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0.75rem', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ wordBreak: 'break-word' }}>{sel.path.length ? sel.path.map((p, i) => <span key={i}>{i > 0 && <span style={{ color: C.faint }}> › </span>}<span style={{ color: DS_SET.has(p) ? ACCENT : C.text2, fontWeight: DS_SET.has(p) ? 600 : 400 }}>{p}</span></span>) : <span style={{ color: C.faint }}>&lt;{sel.tag}&gt;</span>}</span>
            <button type="button" onClick={close} style={{ background: 'none', border: 'none', color: C.text3, cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}>✕</button>
          </div>

          {/* comment composer */}
          <div style={{ padding: '0.625rem 0.75rem' }}>
            <button type="button" onClick={() => setExpand((x) => !x)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', color: C.text3, cursor: 'pointer', fontFamily: FONT, fontSize: '0.75rem', padding: 0, marginBottom: '0.5rem' }}>
              <span style={{ transform: expand ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>▸</span> characteristics · {sel.source}
            </button>
            {expand && (
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', borderRadius: RAD.sm, background: C.surface }}>
                {sel.rows.map((r) => <Row key={r.label} label={r.label} value={r.value} />)}
                {sel.classes.length > 0 && <div style={{ marginTop: '0.5rem', color: C.text2 }}>{sel.classes.join(' ')}</div>}
              </div>
            )}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') saveComment() }} placeholder="What should change?  (⌘/Ctrl+Enter to add)" rows={2} style={{ ...sField, resize: 'vertical', fontSize: '0.875rem', borderColor: comment ? BLUE : C.borderStrong, background: C.deep }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.625rem' }}>
              <button type="button" onClick={close} style={sBtnGhost}>Cancel</button>
              <button type="button" onClick={saveComment} disabled={!comment.trim()} style={{ ...sBtnAccent, opacity: comment.trim() ? 1 : 0.4, cursor: comment.trim() ? 'pointer' : 'not-allowed' }}>Add</button>
            </div>
          </div>

          {/* DS picker */}
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', gap: '0.375rem', padding: '0.875rem 1rem 0' }}>
              {Object.keys(FOLDERS).map((f) => (<button key={f} type="button" onClick={() => { setFolder(f); setSearch('') }} style={{ flex: 1, padding: '0.4375rem 0', borderRadius: RAD.sm, cursor: 'pointer', fontFamily: FONT, fontSize: '0.75rem', fontWeight: folder === f ? 600 : 400, background: folder === f ? C.surface2 : 'transparent', color: folder === f ? C.text : C.text3, border: `1px solid ${folder === f ? C.borderStrong : C.border}` }}>{f}</button>))}
            </div>
            <div style={{ padding: '0.625rem 0.75rem' }}>
              {folder !== 'Icons' ? (
                <>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search…" style={{ ...sField, marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {list.map((c) => (<button key={c} type="button" onClick={() => { setTarget(c); setVariants({}) }} style={{ padding: '0.375rem 0.625rem', borderRadius: RAD.sm, cursor: 'pointer', fontFamily: FONT, fontSize: '0.8125rem', background: target === c ? BLUE : C.surface, color: target === c ? '#fff' : C.text2, border: `1px solid ${C.border}` }}>{c}</button>))}
                    {list.length === 0 && <span style={{ color: C.faint }}>empty</span>}
                  </div>
                </>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.375rem', maxHeight: '11rem', overflowY: 'auto' }}>
                  {ICONS.map((ic) => (<button key={ic} type="button" title={ic} onClick={() => setIcon(ic)} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: RAD.sm, cursor: 'pointer', background: icon === ic ? BLUE : C.surface, border: `1px solid ${C.border}`, padding: '0.25rem' }}><img src={`/icons/${ic}.svg`} alt={ic} style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /></button>))}
                </div>
              )}
            </div>

            {target && (
              <div style={{ padding: '0 0.75rem 0.5rem' }}>
                <div style={label}>preview</div>
                <div style={{ minHeight: '2.75rem', maxHeight: '6.5rem', overflow: 'hidden', borderRadius: RAD.sm, border: `1px dashed ${C.borderStrong}`, background: C.deep, padding: '0.625rem', display: 'flex', alignItems: 'center' }}>{preview ?? <span style={{ color: C.faint }}>preview unavailable for &lt;{target}&gt;</span>}</div>
              </div>
            )}

            {(schema || (target && ICON_PROP.has(target))) && (
              <div style={{ padding: '0 0.75rem 0.5rem' }}>
                <div style={label}>{target} variants</div>
                {target && ICON_PROP.has(target) && (<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}><span style={{ color: C.text2, minWidth: '5rem', flexShrink: 0 }}>icon</span><IconField value={icon} onChange={setIcon} /></div>)}
                {(schema ?? []).map((f) => (<div key={f.prop} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}><span style={{ color: C.text2, minWidth: '5rem', flexShrink: 0 }}>{f.prop}</span><Dropdown value={variants[f.prop] ?? ''} options={f.options} placeholder="—" onChange={(v) => setVariants((s) => ({ ...s, [f.prop]: v }))} /></div>))}
              </div>
            )}

            <div style={{ padding: '0.625rem 0.75rem', borderTop: `1px solid ${C.border}` }}>
              {swapInstruction() && <div style={{ color: C.faint, marginBottom: '0.625rem', wordBreak: 'break-word' }}>{swapInstruction()}</div>}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={close} style={{ ...sBtnOutline, flex: 1 }}>Close</button>
                <button type="button" onClick={saveSwap} disabled={!swapInstruction()} style={{ ...sBtnPrimary, flex: 1, opacity: swapInstruction() ? 1 : 0.4, cursor: swapInstruction() ? 'pointer' : 'not-allowed' }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
