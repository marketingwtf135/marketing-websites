import { useState, useEffect } from 'react'

type FormData = {
  email: string; name: string; position: string; company: string; aum: string;
  utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string; utm_term: string;
}

const AUM_OPTIONS = ['<$1M', '$1–5M', '$5–20M', '$20–100M', '$100M+']
const AMOCRM_WEBHOOK_URL = '' // TODO: fill in

function getUtmParams(): Partial<FormData> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source') ?? '', utm_medium: p.get('utm_medium') ?? '',
    utm_campaign: p.get('utm_campaign') ?? '', utm_content: p.get('utm_content') ?? '',
    utm_term: p.get('utm_term') ?? '',
  }
}

export default function IS8SubscriptionForm() {
  const [data, setData] = useState<FormData>({
    email: '', name: '', position: '', company: '', aum: '',
    utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formStarted, setFormStarted] = useState(false)

  useEffect(() => {
    setData((prev) => ({ ...prev, ...getUtmParams() }))
    // TODO: track form_view
  }, [])

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleFocus() {
    if (!formStarted) { setFormStarted(true); /* TODO: track form_start */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!data.email || !data.name) { setError('Email and name are required.'); return }
    setError(''); setLoading(true)
    try {
      if (AMOCRM_WEBHOOK_URL) {
        await fetch(AMOCRM_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      }
      // TODO: Salesbot PDF, track form_submit
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
      // TODO: track form_error
    } finally { setLoading(false) }
  }

  const inputStyle: React.CSSProperties = {
    height: '3.5rem', padding: '0 1.25rem', borderRadius: '0.875rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontFamily: '"Inter Tight", sans-serif', fontSize: '1rem',
    fontWeight: 500, width: '100%', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: '0.8125rem', fontFamily: '"Inter Tight", sans-serif', fontWeight: 500,
    color: 'rgba(255,255,255,0.4)', marginBottom: '0.375rem', display: 'block',
  }

  const nextMonday = (() => {
    const d = new Date()
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7))
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  })()

  return (
    <section id="insider-form" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]" style={{ scrollMarginTop: '5rem' }}>
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">8.0</span>
            <span className="opacity-80">Subscribe</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Subscribe to Axevil Insider
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: '30rem' }}>
            Get the Pre-IPO Insider Report and the latest quarterly market review delivered to your inbox.
          </p>
        </div>

        <div
          className="mx-auto w-full"
          style={{
            maxWidth: '40rem', background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.5rem', padding: '2rem 1.75rem',
          }}
        >
          {submitted ? (
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="flex items-center justify-center" style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-10" stroke="#4dba79" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-inter-tight font-semibold text-h5 text-white">Thank you. The PDF has been sent to {data.email}.</p>
                <p className="font-inter-tight font-medium text-text-m text-white/50">Check your inbox — the first digest arrives Monday, {nextMonday}.</p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <p className="font-inter-tight font-medium text-text-m text-white/40">Add to calendar: next weekly digest</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Google Calendar', 'Apple Calendar', '.ics'].map((cal) => (
                    <button key={cal} type="button" className="font-inter-tight font-medium text-white/60 hover:text-white transition-colors" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.875rem' }}>
                      {cal}
                    </button>
                  ))}
                </div>
              </div>
              <p className="font-inter-tight font-medium text-text-m text-white/40">
                Already using Pro?{' '}
                <a href="#" className="text-white/70 underline hover:text-white transition-colors">Click here.</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label style={labelStyle}>Email *</label>
                  <input type="email" required autoComplete="email" placeholder="your@email.com" value={data.email} onChange={set('email')} onFocus={handleFocus} style={inputStyle} className="placeholder:text-white/30" />
                </div>
                <div className="flex flex-col">
                  <label style={labelStyle}>Name *</label>
                  <input type="text" required autoComplete="name" placeholder="Your name" value={data.name} onChange={set('name')} onFocus={handleFocus} style={inputStyle} className="placeholder:text-white/30" />
                </div>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label style={labelStyle}>Position</label>
                  <input type="text" autoComplete="organization-title" placeholder="Wealth manager, family office..." value={data.position} onChange={set('position')} style={inputStyle} className="placeholder:text-white/30" />
                </div>
                <div className="flex flex-col">
                  <label style={labelStyle}>Company / Family office</label>
                  <input type="text" autoComplete="organization" placeholder="Company name" value={data.company} onChange={set('company')} style={inputStyle} className="placeholder:text-white/30" />
                </div>
              </div>
              <div className="hidden md:flex flex-col">
                <label style={labelStyle}>AUM bracket</label>
                <select value={data.aum} onChange={set('aum')} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                  <option value="">Select AUM range</option>
                  {AUM_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <input type="hidden" name="utm_source" value={data.utm_source} />
              <input type="hidden" name="utm_medium" value={data.utm_medium} />
              <input type="hidden" name="utm_campaign" value={data.utm_campaign} />
              <input type="hidden" name="utm_content" value={data.utm_content} />
              <input type="hidden" name="utm_term" value={data.utm_term} />
              {error && <p className="font-inter-tight font-medium text-text-m" style={{ color: '#ff6b6b' }}>{error}</p>}
              <button
                type="submit" disabled={loading}
                className="relative flex items-center justify-center font-inter-tight font-semibold text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ height: '3.5rem', borderRadius: '0.875rem', fontSize: '1.125rem', boxShadow: '0.75rem 0.75rem 1rem rgba(255,255,255,0.25), 0.125rem 0.125rem 0.5rem rgba(255,255,255,0.5)' }}
              >
                <div className="absolute inset-0 bg-white pointer-events-none" style={{ borderRadius: '0.875rem' }} />
                <img alt="" src="/img/block01/btn-overlay.png" className="absolute inset-0 w-full h-full object-bottom mix-blend-overlay pointer-events-none" style={{ borderRadius: '0.875rem' }} />
                <span className="relative z-10">{loading ? 'Sending…' : 'Subscribe and get PDF'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
