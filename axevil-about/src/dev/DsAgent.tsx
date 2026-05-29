import React, { useEffect, useMemo, useRef, useState } from 'react'
import { tokens } from '@axevil/design-system'
import * as DS from '@axevil/design-system/components'
import { IconCopyAlt, IconTrashAlt } from 'agentation'

/**
 * ds-agent — DEV-ONLY design inspector + DS component/variant picker + comment
 * composer. A personal companion that sits next to agentation (reusing its icon
 * set for visual consistency). Mounted behind import.meta.env.DEV.
 *
 *  · Click "ds-agent" → activates (accent when ON).
 *  · Hover → highlight + DS tokens + owning DS component.
 *  · Click element → freeze → comment composer (breadcrumb + characteristics +
 *    Cancel/Add) and DS picker (folders, search, live preview, variants, icons).
 *  · Save / Add → queues an edit (with Desktop/Tablet/Mobile viewport label).
 *  · Copy → numbered list of all queued edits for chat. Trash → clear all.
 */

type AnyTokens = { colors?: Record<string, string>; borderRadius?: Record<string, string>; spacing?: Record<string, string>; fontSize?: Record<string, unknown> }
const T = tokens as AnyTokens
const ACCENT = '#4dba79'
const BLUE = '#546fef'

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
function fiberName(f: any): string | undefined {
  const t = f?.type; if (!t) return undefined
  if (typeof t === 'function') return t.displayName || t.name
  if (typeof t === 'object') return t.displayName || t.render?.displayName || t.render?.name || t.type?.displayName || t.type?.name
  return undefined
}
function componentName(el: Element): string | null {
  let f = fiberOf(el)
  while (f) { const n = fiberName(f); if (n && n.length > 1 && !/^(Unknown|MotionComponent|_c\d*)$/.test(n)) return DS_SET.has(n) ? n : null; f = f.return }
  return null
}
function componentPath(el: Element): string[] {
  const out: string[] = []
  let f = fiberOf(el)
  while (f) { const n = fiberName(f); if (n && n.length > 1 && /^[A-Z]/.test(n) && !/^(Unknown|MotionComponent|_c\d*)$/.test(n) && out[0] !== n) out.unshift(n); f = f.return }
  return out.slice(-5)
}
function sourceOf(el: Element): string | null {
  let f = fiberOf(el)
  while (f) { const s = f._debugSource; if (s?.fileName) return `${s.fileName.split(/[\\/]/).slice(-2).join('/')}:${s.lineNumber}`; f = f.return }
  return null
}
function computeRows(el: Element, root: number) {
  const cs = getComputedStyle(el); const rows: { label: string; value: string }[] = []
  rows.push({ label: 'Type', value: `${fontTokFromClasses(el) ?? '—'} · ${Math.round(parseFloat(cs.fontSize))}px · lh ${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 0).toFixed(2)} · w${cs.fontWeight}` })
  const cm = buildColorMap()
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
  render() { return this.state.err ? <span style={{ color: '#717171' }}>preview unavailable</span> : this.props.children }
}

function Dropdown({ value, options, placeholder, onChange }: { value: string; options: string[]; placeholder: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3125rem 0.5rem', borderRadius: '0.375rem', background: '#151515', border: `1px solid ${open ? BLUE : 'rgba(255,255,255,0.16)'}`, color: value ? '#fff' : '#717171', fontFamily: 'inherit', fontSize: '11px', cursor: 'pointer' }}>
        <span>{value || placeholder}</span><span style={{ color: '#717171', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 2px)', left: 0, right: 0, zIndex: 10, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '0.375rem', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', maxHeight: '10rem', overflowY: 'auto' }}>
          <button type="button" onClick={() => { onChange(''); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.375rem 0.5rem', background: 'none', border: 'none', color: '#717171', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px' }}>—</button>
          {options.map((o) => (<button key={o} type="button" onClick={() => { onChange(o); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.375rem 0.5rem', background: value === o ? BLUE : 'none', border: 'none', color: value === o ? '#fff' : '#bcbcbc', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px' }}>{o}</button>))}
        </div>
      )}
    </div>
  )
}

function IconField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const list = ICONS.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.375rem', padding: '0.3125rem 0.5rem', borderRadius: '0.375rem', background: '#151515', border: `1px solid ${open ? BLUE : 'rgba(255,255,255,0.16)'}`, color: value ? '#fff' : '#717171', fontFamily: 'inherit', fontSize: '11px', cursor: 'pointer' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>{value && <img src={`/icons/${value}.svg`} alt="" style={{ width: '0.875rem', height: '0.875rem', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />}{value || 'choose icon'}</span>
        <span style={{ color: '#717171', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 2px)', left: 0, right: 0, zIndex: 10, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '0.375rem', padding: '0.375rem', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="search icons…" style={{ width: '100%', padding: '0.3125rem 0.5rem', borderRadius: '0.375rem', background: '#151515', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'inherit', fontSize: '11px', marginBottom: '0.375rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem', maxHeight: '10rem', overflowY: 'auto' }}>
            {list.map((ic) => (<button key={ic} type="button" title={ic} onClick={() => { onChange(ic); setOpen(false) }} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', cursor: 'pointer', background: value === ic ? BLUE : '#151515', border: '1px solid rgba(255,255,255,0.12)', padding: '0.2rem' }}><img src={`/icons/${ic}.svg`} alt={ic} style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /></button>))}
            {list.length === 0 && <span style={{ gridColumn: '1 / -1', color: '#717171' }}>no icons</span>}
          </div>
        </div>
      )}
    </div>
  )
}

interface HoverInfo { comp: string; tag: string; rect: DOMRect; rows: { label: string; value: string }[]; classes: string[] }
interface Selected { comp: string; tag: string; source: string; rect: DOMRect; rows: { label: string; value: string }[]; classes: string[]; path: string[] }
interface Edit { viewport: string; text: string }

const iconBtn = (active: boolean): React.CSSProperties => ({ width: '2.25rem', height: '2.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', cursor: 'pointer', background: active ? ACCENT : '#151515', color: active ? '#0a0a0a' : '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' })

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
  const [edits, setEdits] = useState<Edit[]>([])
  const [copied, setCopied] = useState(false)
  const rafRef = useRef<number | null>(null)

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
      setSel({ comp, tag: tgt.tagName.toLowerCase(), source: sourceOf(tgt) ?? '—', rect: tgt.getBoundingClientRect(), rows: computeRows(tgt, root), classes: dsClasses(tgt), path: componentPath(tgt) })
      setTarget(DS_SET.has(comp) ? comp : null); setVariants({}); setIcon(''); setSearch(''); setComment(''); setExpand(false); setCopied(false)
      if (DS_SET.has(comp)) { const fo = Object.keys(FOLDERS).find((f) => FOLDERS[f].includes(comp)); if (fo) setFolder(fo) }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [enabled])

  function close() { setSel(null); setTarget(null); setVariants({}); setIcon(''); setSearch(''); setComment(''); setExpand(false) }

  function swapInstruction(): string {
    if (!sel) return ''
    const props = Object.entries(variants).filter(([, v]) => v !== '')
    if (icon) props.push(['icon', `/icons/${icon}.svg`])
    const propStr = props.length ? ' ' + props.map(([k, v]) => `${k}=${v}`).join(' ') : ''
    if (target && target !== sel.comp) return `at ${sel.source}: replace ${sel.comp === 'none' ? `host <${sel.tag}>` : `<${sel.comp}>`} with DS <${target}${propStr} /> (keep content).`
    if (target && props.length) return `at ${sel.source}: on <${target}>, set props {${props.map(([k, v]) => `${k}: ${v}`).join(', ')}}.`
    return ''
  }
  function add(text: string) { if (!sel || !text) return; setEdits((e) => [...e, { viewport: viewportLabel(window.innerWidth), text }]); close() }
  function saveComment() { if (sel && comment.trim()) add(`at ${sel.source} (${sel.path.join(' › ') || sel.tag}): ${comment.trim()}`) }
  function saveSwap() { const t = swapInstruction(); if (t) add(comment.trim() ? `${t} — note: ${comment.trim()}` : t) }
  async function copyAll() { try { await navigator.clipboard.writeText(edits.map((e, i) => `${i + 1}. [${e.viewport}] ${e.text}`).join('\n\n')); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* noop */ } }

  const list = folder === 'Icons' ? [] : FOLDERS[folder].filter((c) => c.toLowerCase().includes(search.toLowerCase()))
  const schema = target ? VARIANT_SCHEMA[target] : undefined
  const activeRect = sel?.rect ?? hover?.rect
  const pos = activeRect ? { top: Math.min(activeRect.bottom + 8, window.innerHeight - 24), left: Math.min(activeRect.left, window.innerWidth - 360) } : {}
  const panelBase: React.CSSProperties = { position: 'fixed', zIndex: 2147483647, width: '22rem', maxWidth: '94vw', maxHeight: '82vh', overflowY: 'auto', background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '0.625rem', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', lineHeight: 1.5, color: '#e6e6e6', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }

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
      <div style={{ position: 'fixed', left: '1rem', bottom: '1rem', zIndex: 2147483647, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <button type="button" onClick={() => { setEnabled((v) => !v); close() }} title="ds-agent"
          style={{ position: 'relative', padding: '0.5rem 0.875rem', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'ui-monospace, monospace', fontSize: '12px', fontWeight: 700, background: enabled ? ACCENT : '#151515', color: enabled ? '#0a0a0a' : '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
          ds-agent
          {edits.length > 0 && <span style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', minWidth: '1.125rem', height: '1.125rem', padding: '0 0.25rem', borderRadius: '999px', background: BLUE, color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{edits.length}</span>}
        </button>
        {edits.length > 0 && (
          <>
            <button type="button" title="copy all edits" onClick={copyAll} style={iconBtn(copied)}><IconCopyAlt size={16} /></button>
            <button type="button" title="delete all" onClick={() => setEdits([])} style={iconBtn(false)}><IconTrashAlt size={16} /></button>
          </>
        )}
      </div>

      {/* highlight */}
      {enabled && activeRect && <div style={{ position: 'fixed', pointerEvents: 'none', zIndex: 2147483646, top: activeRect.top, left: activeRect.left, width: activeRect.width, height: activeRect.height, outline: `2px solid ${sel ? BLUE : ACCENT}`, background: sel ? 'rgba(84,111,239,0.10)' : 'rgba(77,186,121,0.08)' }} />}

      {/* hover token panel */}
      {enabled && !sel && hover && (
        <div style={{ ...panelBase, pointerEvents: 'none', padding: '0.625rem 0.75rem', ...pos }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.375rem', alignItems: 'baseline' }}><span style={{ color: hover.comp === 'none' ? '#9b9b9b' : ACCENT, fontWeight: 700 }}>Component: {hover.comp}</span><span style={{ color: '#717171' }}>&lt;{hover.tag}&gt;</span></div>
          {hover.rows.map((r) => (<div key={r.label} style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#9b9b9b', minWidth: '3.5rem', flexShrink: 0 }}>{r.label}</span><span style={{ wordBreak: 'break-word' }}>{r.value}</span></div>))}
          <div style={{ marginTop: '0.375rem', color: '#717171' }}>click to comment / pick a DS component →</div>
        </div>
      )}

      {/* picker + comment composer */}
      {enabled && sel && (
        <div style={{ ...panelBase, pointerEvents: 'auto', ...pos }}>
          {/* breadcrumb */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.625rem', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ wordBreak: 'break-word' }}>{sel.path.length ? sel.path.map((p, i) => <span key={i}>{i > 0 && <span style={{ color: '#555' }}> › </span>}<span style={{ color: DS_SET.has(p) ? ACCENT : '#bcbcbc', fontWeight: DS_SET.has(p) ? 700 : 400 }}>{p}</span></span>) : <span style={{ color: '#717171' }}>&lt;{sel.tag}&gt;</span>}</span>
            <button type="button" onClick={close} style={{ background: 'none', border: 'none', color: '#9b9b9b', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>✕</button>
          </div>

          {/* comment composer */}
          <div style={{ padding: '0.625rem' }}>
            <button type="button" onClick={() => setExpand((x) => !x)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', color: '#9b9b9b', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', padding: 0, marginBottom: '0.375rem' }}>
              <span style={{ transform: expand ? 'rotate(90deg)' : 'none' }}>▸</span> characteristics · {sel.source}
            </button>
            {expand && (
              <div style={{ marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '0.375rem', background: '#111' }}>
                {sel.rows.map((r) => (<div key={r.label} style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#9b9b9b', minWidth: '3.5rem', flexShrink: 0 }}>{r.label}</span><span style={{ wordBreak: 'break-word' }}>{r.value}</span></div>))}
                {sel.classes.length > 0 && <div style={{ marginTop: '0.375rem', color: '#bcbcbc' }}>{sel.classes.join(' ')}</div>}
              </div>
            )}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What should change?" rows={2}
              style={{ width: '100%', resize: 'vertical', padding: '0.5rem', borderRadius: '0.5rem', background: '#0d0d0d', border: `1px solid ${comment ? BLUE : 'rgba(255,255,255,0.16)'}`, color: '#fff', fontFamily: 'inherit', fontSize: '12px' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={close} style={{ padding: '0.375rem 0.875rem', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, background: 'transparent', color: '#bcbcbc', border: 'none' }}>Cancel</button>
              <button type="button" onClick={saveComment} disabled={!comment.trim()} style={{ padding: '0.375rem 1rem', borderRadius: '0.375rem', cursor: comment.trim() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, background: comment.trim() ? BLUE : '#222', color: comment.trim() ? '#fff' : '#666', border: 'none' }}>Add</button>
            </div>
          </div>

          {/* DS picker */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ display: 'flex', gap: '0.25rem', padding: '0.5rem 0.625rem 0' }}>
              {Object.keys(FOLDERS).map((f) => (<button key={f} type="button" onClick={() => { setFolder(f); setSearch('') }} style={{ flex: 1, padding: '0.3125rem 0', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: folder === f ? 700 : 400, background: folder === f ? '#222' : 'transparent', color: folder === f ? '#fff' : '#9b9b9b', border: '1px solid rgba(255,255,255,0.1)' }}>{f}</button>))}
            </div>
            <div style={{ padding: '0.5rem 0.625rem' }}>
              {folder !== 'Icons' ? (
                <>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search…" style={{ width: '100%', padding: '0.375rem 0.5rem', borderRadius: '0.375rem', background: '#151515', border: '1px solid rgba(255,255,255,0.16)', color: '#fff', fontFamily: 'inherit', fontSize: '11px', marginBottom: '0.375rem' }} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {list.map((c) => (<button key={c} type="button" onClick={() => { setTarget(c); setVariants({}) }} style={{ padding: '0.25rem 0.5rem', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', background: target === c ? BLUE : '#1a1a1a', color: target === c ? '#fff' : '#bcbcbc', border: '1px solid rgba(255,255,255,0.12)' }}>{c}</button>))}
                    {list.length === 0 && <span style={{ color: '#717171' }}>empty</span>}
                  </div>
                </>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem', maxHeight: '11rem', overflowY: 'auto' }}>
                  {ICONS.map((ic) => (<button key={ic} type="button" title={ic} onClick={() => setIcon(ic)} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.375rem', cursor: 'pointer', background: icon === ic ? BLUE : '#151515', border: '1px solid rgba(255,255,255,0.12)', padding: '0.25rem' }}><img src={`/icons/${ic}.svg`} alt={ic} style={{ width: '70%', height: '70%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /></button>))}
                </div>
              )}
            </div>

            {target && (
              <div style={{ padding: '0 0.625rem 0.5rem' }}>
                <div style={{ color: '#9b9b9b', marginBottom: '0.375rem' }}>preview:</div>
                <div style={{ minHeight: '3.5rem', maxHeight: '9rem', overflow: 'hidden', borderRadius: '0.5rem', border: '1px dashed rgba(255,255,255,0.18)', background: '#080808', padding: '0.75rem', display: 'flex', alignItems: 'center' }}>{preview ?? <span style={{ color: '#717171' }}>preview unavailable for &lt;{target}&gt;</span>}</div>
              </div>
            )}

            {(schema || (target && ICON_PROP.has(target))) && (
              <div style={{ padding: '0 0.625rem 0.5rem' }}>
                <div style={{ color: '#9b9b9b', marginBottom: '0.375rem' }}>{target} variants:</div>
                {target && ICON_PROP.has(target) && (<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}><span style={{ color: '#bcbcbc', minWidth: '5rem', flexShrink: 0 }}>icon</span><IconField value={icon} onChange={setIcon} /></div>)}
                {(schema ?? []).map((f) => (<div key={f.prop} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}><span style={{ color: '#bcbcbc', minWidth: '5rem', flexShrink: 0 }}>{f.prop}</span><Dropdown value={variants[f.prop] ?? ''} options={f.options} placeholder="—" onChange={(v) => setVariants((s) => ({ ...s, [f.prop]: v }))} /></div>))}
              </div>
            )}

            <div style={{ padding: '0.5rem 0.625rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {swapInstruction() && <div style={{ color: '#717171', marginBottom: '0.5rem', wordBreak: 'break-word' }}>{swapInstruction()}</div>}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={close} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>Close</button>
                <button type="button" onClick={saveSwap} disabled={!swapInstruction()} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', cursor: swapInstruction() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, background: swapInstruction() ? '#fff' : '#222', color: swapInstruction() ? '#0a0a0a' : '#666', border: 'none' }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
