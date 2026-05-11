import { useEffect, useRef } from 'react'
import CtaButton from '../components/CtaButton'

export default function Block01Hero() {
  const blurRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = blurRef.current
    if (!el) return
    const onScroll = () => {
      const blur = Math.min(window.scrollY / window.innerHeight, 1) * 32
      el.style.backdropFilter = `blur(${blur}px)`
      el.style.webkitBackdropFilter = `blur(${blur}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="w-full overflow-clip"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        minHeight: '600px',
        paddingTop: '80px',
        zIndex: 0,
      }}
    >

      {/* Background video */}
      <video
        src="/ostracized_remix_scene.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'left center',
          zIndex: 10,
          opacity: 0.6,
        }}
      />

      {/* Right-side fade */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(8,8,8,0) 0%, var(--page-bg) 60%)',
          zIndex: 0,
        }}
      />

      {/* Hero illustration */}
      <div className="hero-illustration" style={{ zIndex: 11 }}>
        <img
          alt=""
          src="/img/block01/hero-image.png"
          className="block w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Copy + CTA */}
      <div className="absolute w-full" style={{ bottom: '80px', zIndex: 15 }}>
        <div className="mx-auto w-full max-w-content container-px">
          <div className="flex flex-col gap-12 items-start">
            <div className="flex flex-col gap-6 items-start">
              <h1
                className="font-inter-tight font-semibold text-h1-semi leading-none tracking-[-0.02em] text-transparent bg-clip-text whitespace-pre-line"
                style={{ backgroundImage: 'linear-gradient(104.211deg, var(--neutral-00) 2.5635%, var(--neutral-35) 99.06%)' }}
              >
                {'Pre-IPO \nInfrastructure'}
              </h1>
              <p className="font-inter-tight font-medium text-text-xl text-white/60" style={{ width: '604px' }}>
                Private market access, end to end
              </p>
            </div>
            <CtaButton>Request Access</CtaButton>
          </div>
        </div>
      </div>

      {/* blur-bg — Figma 416:6117 — opacity 0→1 via ref on scroll */}
      <div
        ref={blurRef}
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100svh',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          background: 'rgba(217,217,217,0.01)',
          opacity: 1,
          zIndex: 1000,
        }}
      />
    </section>
  )
}
