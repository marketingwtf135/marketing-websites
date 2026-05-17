import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import NLLetterPreview from './NLLetterPreview'

export default function NLMethodology() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section id="nl-methodology" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-0 py-[3.75rem] sm:py-[5rem] lg:py-[6.25rem]">
        <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">

          {/* Text heading */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center w-full lg:px-[80px]">
            <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
              <span style={{ color: '#404040' }}>3.0</span>
              {/* Mobile: "Пример выпуска", Desktop: "Методология" */}
              <span className="sm:hidden" style={{ color: '#848484' }}>Пример выпуска</span>
              <span className="hidden sm:inline" style={{ color: '#848484' }}>Методология</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{
                fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(141.44deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
                maxWidth: 1075,
              }}>
              Так выглядит один выпуск
            </h2>
            <p className="font-inter-tight font-medium text-center"
              style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.36px', maxWidth: 540 }}>
              Лидерборд secondary, открывшиеся тендер-оферы, новые раунды, 1 sector deep-dive — всё в одном письме.
            </p>
          </div>

          {/* Dark card — full width */}
          <div
            ref={cardRef}
            className="relative w-full flex items-end justify-center overflow-hidden"
            style={{
              borderRadius: 'clamp(24px, 2.2vw, 32px)',
              paddingTop: 'clamp(40px, 4.4vw, 64px)',
              minHeight: 'clamp(480px, 55vw, 800px)',
            }}
          >
            {/* Parallax rock background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden
              style={{ borderRadius: 'clamp(24px, 2.2vw, 32px)' }}>
              <div className="absolute inset-0" style={{ background: '#111111', borderRadius: 'clamp(24px, 2.2vw, 32px)' }} />
              <motion.img
                src="/img/newsletter/hero-bg-rock.png"
                alt=""
                className="absolute max-w-none object-cover"
                style={{
                  top: 'calc(-10% + 50px)', left: 0, right: 0,
                  width: '100%', height: '130%',
                  objectFit: 'cover', borderRadius: 'clamp(24px, 2.2vw, 32px)',
                  y: bgY,
                }}
                loading="lazy"
              />
            </div>

            {/* Letter preview — scale 0.845 mobile (280px), 1.188 desktop */}
            <div className="absolute left-1/2 z-10 sm:hidden"
              style={{ top: 140, transform: 'translateX(-50%)' }}>
              <NLLetterPreview scale={0.845} />
            </div>
            <div className="absolute left-1/2 z-10 hidden sm:block"
              style={{ bottom: 0, transform: 'translateX(-50%) translateY(60px)' }}>
              <NLLetterPreview scale={1.188} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
