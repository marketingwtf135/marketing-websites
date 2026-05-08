import { useEffect, useRef, useState } from 'react'

/**
 * Block05Mobile — sticky scroll animation (Phase 1: test with duplicated content)
 *
 * The outer wrapper is 200vh tall so the section stays sticky while the user scrolls.
 * Scroll progress (0→1) crossfades Frame A → Frame B via blur+opacity.
 * Final version: Frame B will have a different phone + different deal card.
 */

// ── Frame data ────────────────────────────────────────────────────
const FRAMES = [
  {
    // Frame A — Deal Feed
    cardNum: '1.0',
    cardTitle: 'Deal Feed',
    cardSub: 'Allocate to SpaceX, Anthropic, xAI',
  },
  {
    // Frame B — duplicated for now, content will be replaced later
    cardNum: '2.0',
    cardTitle: 'Portfolio',
    cardSub: 'Track your positions in real time',
  },
]

function useScrollProgress(ref: React.RefObject<HTMLDivElement>) {
  const [progress, setProgress] = useState(0) // 0 = start, 1 = end

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      // Progress goes 0→1 as the sticky section scrolls through its extra height
      // We have 100vh extra scrollable space inside the 200vh wrapper
      const extra = height / 2 // half of 200vh wrapper = 100vh extra scroll space
      // top is negative once we've scrolled past the section top
      const scrolled = Math.max(0, -top)
      setProgress(Math.min(1, scrolled / extra))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])

  return progress
}

export default function Block05Mobile() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(wrapperRef)

  // Blur+opacity for each frame
  // Frame A: visible at 0, disappears toward 1
  // Frame B: hidden at 0, appears toward 1
  const blurA = progress * 12       // 0 → 12px blur
  const opacityA = 1 - progress     // 1 → 0
  const blurB = (1 - progress) * 12 // 12 → 0 blur
  const opacityB = progress         // 0 → 1

  return (
    /* 200vh outer wrapper allows scroll while content is sticky */
    <div ref={wrapperRef} className="w-full bg-page-bg" style={{ height: '200vh', marginTop: '200px' }}>
      {/* Sticky inner — sticks 32px from top */}
      <div className="flex justify-center" style={{ position: 'sticky', top: '120px' }}>
        <section
          className="relative overflow-clip w-full max-w-content"
          style={{
            height: '1080px',
            borderRadius: '64px',
            border: '3px solid #121212',
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 rounded-section pointer-events-none overflow-hidden">
            <img alt="" src="/img/block05/gradient-section-mobile-app.png" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Heading */}
          <h2 className="absolute font-inter-tight font-semibold text-h2 text-white whitespace-pre-line" style={{ left: '60px', top: '60px' }}>
            {'Mobile app \nfor investor'}
          </h2>

          {/* ── Info card A — z:1, blur OUT ── */}
          <div
            className="absolute bg-surface-2 border-8 border-surface-edge flex flex-col items-start p-4 rounded-3xl"
            style={{ right: '60px', top: '60px', width: '297px', opacity: opacityA, filter: `blur(${blurA}px)`, transition: 'none', zIndex: 1 }}
          >
            <div className="flex flex-col gap-12 items-start text-white w-full">
              <p className="font-inter-tight font-medium text-text-m text-white/50 whitespace-nowrap">{FRAMES[0].cardNum}</p>
              <div className="flex flex-col gap-4 items-start w-full">
                <p className="font-inter-tight font-semibold text-h5 whitespace-nowrap">{FRAMES[0].cardTitle}</p>
                <p className="font-inter-tight font-medium text-text-m text-white/50 w-full">{FRAMES[0].cardSub}</p>
              </div>
            </div>
          </div>

          {/* ── Phone A — z:1, blur OUT ── */}
          <PhoneWithCards frameIndex={0} blurPx={blurA} opacityVal={opacityA} zIdx={1} />

          {/* ── Info card B — z:2 (накрывает A), blur IN ── */}
          <div
            className="absolute bg-surface-2 border-8 border-surface-edge flex flex-col items-start p-4 rounded-3xl"
            style={{ right: '60px', top: '60px', width: '297px', opacity: opacityB, filter: `blur(${blurB}px)`, transition: 'none', zIndex: 2 }}
          >
            <div className="flex flex-col gap-12 items-start text-white w-full">
              <p className="font-inter-tight font-medium text-text-m text-white/50 whitespace-nowrap">{FRAMES[1].cardNum}</p>
              <div className="flex flex-col gap-4 items-start w-full">
                <p className="font-inter-tight font-semibold text-h5 whitespace-nowrap">{FRAMES[1].cardTitle}</p>
                <p className="font-inter-tight font-medium text-text-m text-white/50 w-full">{FRAMES[1].cardSub}</p>
              </div>
            </div>
          </div>

          {/* ── Phone B — z:2 (накрывает A сверху), blur IN ── */}
          <PhoneWithCards frameIndex={1} blurPx={blurB} opacityVal={opacityB} zIdx={2} />
        </section>
      </div>
    </div>
  )
}

// ── Phone component ───────────────────────────────────────────────
function PhoneWithCards({ frameIndex, blurPx = 0, opacityVal = 1, zIdx = 1 }: { frameIndex: number; blurPx?: number; opacityVal?: number; zIdx?: number }) {
  const cards = [
    { id: 'card-0', company: 'Space',     category: 'Growth Equity', logo: '/img/block05/logo-spacex.svg',    logoW: '114px', logoH: '16px' },
    { id: 'card-1', company: 'Anthropic', category: 'Growth Equity', logo: '/img/block05/logo-anthropic.svg', logoW: '23px',  logoH: '16px' },
    { id: 'card-2', company: 'Cursor',    category: 'Growth Equity', logo: '/img/block05/logo-cursor.svg',    logoW: '20px',  logoH: '20px' },
  ]

  return (
    <div
      id={`block05-phone-frame-${frameIndex}`}
      className="absolute pointer-events-none overflow-hidden"
      style={{ left: '50%', top: '180px', transform: 'translateX(-50%)', width: '390px', height: '797px', opacity: opacityVal, filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none', transition: 'none', zIndex: zIdx }}
    >
      {/* Screen bg */}
      <div
        id={`block05-screen-${frameIndex}`}
        className="absolute overflow-hidden"
        style={{ left: '7px', top: '7px', width: '376px', height: '783px', borderRadius: '80px', background: '#060606', zIndex: 1 }}
      >
        {/* iOS Navigation Bar */}
        <div id={`block05-ios-navbar-${frameIndex}`} style={{ width: '100%', flexShrink: 0 }}>
          <div style={{ height: '50px', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '6px' }}>
              <span style={{ fontFamily: '"SF Pro", -apple-system, sans-serif', fontWeight: 590, fontSize: '15.9px', color: '#ffffff', lineHeight: '20.6px', whiteSpace: 'nowrap' }}>9:41</span>
            </div>
            <div style={{ width: '116px', height: '9px', flexShrink: 0 }} />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6.5px', paddingLeft: '6px', paddingRight: '15px' }}>
              <img alt="" src="/img/block05/ios-cellular.svg" style={{ width: '17.9px', height: '11.4px', display: 'block' }} />
              <img alt="" src="/img/block05/ios-wifi.svg"     style={{ width: '16px',   height: '11.5px', display: 'block' }} />
              <img alt="" src="/img/block05/ios-battery.svg"  style={{ width: '25.5px', height: '12.1px', display: 'block' }} />
            </div>
          </div>
          <div style={{ height: '24px' }} />
        </div>

        {/* Cards */}
        <div id={`block05-cards-${frameIndex}`} style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cards.map((item) => (
            <div key={item.id} id={`block05-${item.id}-f${frameIndex}`} style={{ background: '#151515', borderRadius: '24px', padding: '16px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
              <img alt={item.company} src={item.logo} style={{ width: item.logoW, height: item.logoH, objectFit: 'contain', objectPosition: 'left' }} />
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '24px', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.25 }}>{item.company}</span>
                <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>{item.category}</span>
              </div>
              <div style={{ marginTop: '40px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)', borderRadius: '160px', padding: '12px 16px', alignSelf: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '8px', background: '#4dba79', flexShrink: 0 }} />
                <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', whiteSpace: 'nowrap' }}>Accepting allocations</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0" style={{ height: '200px', background: 'linear-gradient(to top, #060606 30%, transparent 100%)' }} />
      </div>

      {/* PNG bezel on top */}
      <img
        id={`block05-phone-bezel-${frameIndex}`}
        alt=""
        src="/img/block04/iphone-bezel.png"
        width={390}
        height={844}
        className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none"
        style={{ zIndex: 2 }}
      />
    </div>
  )
}
