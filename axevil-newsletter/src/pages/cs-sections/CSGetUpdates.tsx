import { useState } from 'react'

/**
 * Section 7 — Get Updates (Figma 142:10692)
 * bg-shine built from 5 vector layers (node 142:10693):
 *   - 2 wave SVGs (top / bottom-flipped)
 *   - 1 wide diagonal wave
 *   - 2 ellipse glows (left + right, mix-blend-mode: plus-lighter)
 * Section: h-700px, overflow:visible, z-index:0 (below FAQ z:1 and Footer z:1)
 *
 * NOTE: Figma asset URLs expire in 7 days — save them locally when possible.
 */

// ── Figma vector assets (node 142:10693) ─────────────────────────────────────
const WAVE_TOP  = 'https://www.figma.com/api/mcp/asset/0a59ff36-3d8c-4073-a7de-6a2e7a99265a'
const WAVE_BOT  = 'https://www.figma.com/api/mcp/asset/396ca8d8-d0f9-45de-8197-e14fbfcbd03e'
const WAVE_WIDE = 'https://www.figma.com/api/mcp/asset/cd2974f9-4ae3-4710-91de-fe374cade659'
const ELLIPSE   = 'https://www.figma.com/api/mcp/asset/1fe57acf-d5ad-4b5c-884c-e1fcdf09eea3'

export default function CSGetUpdates() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      className="relative w-full bg-page-bg overflow-visible"
      style={{ height: 'clamp(600px, 80vw, 900px)', zIndex: 0 }}
    >
      {/* ── bg-shine: 5 vector layers from Figma 142:10693 ───────────────── */}

      {/* Wave 1 — top wave, Figma: left=-135px top=-305px w=1930px h=479px */}
      <div
        className="absolute pointer-events-none overflow-visible"
        style={{ left: '-7%', top: '-305px', width: '114%', height: '800px' }}
      >
        <img alt="" src={WAVE_TOP} className="block w-full h-full" style={{ objectFit: 'fill' }} />
      </div>

      {/* Wave 2 — bottom wave flipped, Figma: left=-135px top=182px w=1930px h=675px scaleY(-1) */}
      <div
        className="absolute pointer-events-none overflow-visible"
        style={{ left: '-7%', top: '182px', width: '114%', height: '1128px', transform: 'scaleY(-1)' }}
      >
        <img alt="" src={WAVE_BOT} className="block w-full h-full" style={{ objectFit: 'fill' }} />
      </div>

      {/* Wave 3 — wide diagonal, Figma: left=-319px top=73px w=2500px h=514px */}
      <div
        className="absolute pointer-events-none overflow-visible"
        style={{ left: '-17%', top: '73px', width: '130%', height: '858px' }}
      >
        <img alt="" src={WAVE_WIDE} className="block w-full h-full" style={{ objectFit: 'fill' }} />
      </div>

      {/* Ellipse glow left — mix-blend-mode: plus-lighter, Figma: left=-360px top=124px w=367px h=396px */}
      <div
        className="absolute pointer-events-none overflow-visible"
        style={{ left: '-19%', top: '124px', width: '19%', height: '662px', mixBlendMode: 'plus-lighter' }}
      >
        <img alt="" src={ELLIPSE} className="block w-full h-full" style={{ objectFit: 'fill' }} />
      </div>

      {/* Ellipse glow right — mix-blend-mode: plus-lighter, Figma: right=-158px top=124px w=367px h=396px */}
      <div
        className="absolute pointer-events-none overflow-visible"
        style={{ right: '-8%', top: '124px', width: '19%', height: '662px', mixBlendMode: 'plus-lighter' }}
      >
        <img alt="" src={ELLIPSE} className="block w-full h-full" style={{ objectFit: 'fill' }} />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-8"
        style={{ zIndex: 1 }}
      >
        <div className="flex flex-col items-center gap-8 sm:gap-10 w-full" style={{ maxWidth: '710px' }}>

          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
                <span className="opacity-50">7.0</span>
                <span className="opacity-80">Email Newsletter</span>
              </div>
              <h2
                className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
                style={{
                  fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em',
                  backgroundImage: 'linear-gradient(95.468deg, #ffffff 0.176%, #b7b7b7 98.822%)',
                }}
              >
                Get Updates
              </h2>
            </div>
            <p
              className="font-inter-tight font-medium text-center"
              style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: '#9b9b9b', maxWidth: 400 }}
            >
              Stay informed about Anthropic stock news and new investment rounds.
            </p>
          </div>

          {submitted ? (
            <div
              className="flex items-center justify-center font-inter-tight font-medium text-text-l text-status-open"
              style={{ height: 56, padding: '0 24px', borderRadius: 16, background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)' }}
            >
              ✓ You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourmail@gmail.com"
                className="font-inter-tight font-medium text-white placeholder:text-white/40 focus:outline-none w-full sm:w-[360px]"
                style={{
                  height: 56, padding: '10px 16px', borderRadius: 16,
                  background: '#151515', border: 'none', fontSize: 16, lineHeight: 1.1,
                }}
              />
              <button
                type="submit"
                className="shrink-0 font-inter-tight font-semibold hover:scale-[1.02] transition-transform focus-visible:outline-none w-full sm:w-auto"
                style={{
                  height: 56, padding: '13px 32px', borderRadius: 16,
                  background: '#fff', color: '#202020', fontSize: 16, lineHeight: 1.1,
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
