import { useEffect, useState } from 'react'
import { useLang } from '../../lib/lang'

export default function WBSpeaker() {
  const { t } = useLang()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      id="wb-speaker"
      className="relative w-full bg-page-bg"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] container-px padding-global"
        style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}
      >
        <div className="flex flex-col items-center text-center gap-4 mb-6 md:mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">{t.speaker.label.split(' ')[0]}</span>
            <span className="opacity-80">{t.speaker.label.split(' ').slice(1).join(' ')}</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            {t.speaker.heading}
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden flex flex-col items-start"
          style={{
            minHeight: isMobile ? 'clamp(36rem, 60vw, 54.875rem)' : 'clamp(28rem, 50vw, 46.875rem)',
            padding: isMobile ? '1.5rem' : '2rem',
            gap: isMobile ? '2rem' : '6.25rem',
            borderRadius: '1.5rem',
            backgroundImage: 'url(/img/bg-speaker.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0d0d0d',
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src="/bg-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            style={{ opacity: 0.5 }}
          />

          <div
            className="relative flex flex-col md:flex-row md:justify-between gap-6 md:gap-12 w-full"
            style={{ zIndex: 1 }}
          >
            <div className="flex flex-col gap-2">
              <h3
                className="font-inter-tight font-semibold text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                {t.speaker.name}
              </h3>
              <p className="font-inter-tight font-medium text-white/55" style={{ fontSize: '0.9375rem' }}>
                {t.speaker.role}
              </p>
            </div>

            <div style={{ maxWidth: '30rem' }} className="flex flex-col gap-6">
              <p
                className="font-inter-tight font-medium"
                style={{ color: '#E6E6E6', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', lineHeight: '135%', letterSpacing: '-0.36px' }}
              >
                {t.speaker.bio}
              </p>
              <blockquote
                className="font-inter-tight font-medium italic"
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                  lineHeight: '140%',
                  letterSpacing: '-0.01em',
                  paddingLeft: '1rem',
                  borderLeft: '2px solid rgba(255,255,255,0.35)',
                  margin: 0,
                }}
              >
                {t.speaker.quote}
              </blockquote>
            </div>
          </div>

          <img
            src="/img/image-speaker.png"
            alt={t.speaker.name}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? 'clamp(22rem, 90vw, 30rem)' : 'clamp(16rem, 45vw, 44.6875rem)',
              height: isMobile ? 'clamp(20rem, 80vw, 28rem)' : 'clamp(14rem, 40vw, 43.75rem)',
              objectFit: 'contain',
              objectPosition: 'bottom center',
            }}
          />
        </div>
      </div>
    </section>
  )
}
