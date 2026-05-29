import { motion } from 'framer-motion'
import { BtnOwn, HeroEyebrow, BgFeatures, PRELOAD_DEVICES_MOTION } from '@axevil/design-system/components'
import { HERO } from './content'

/**
 * About — Hero (ported from RIHero, Figma 1131:5875 / 946:4194 mobile)
 * 100svh section · overflow hidden.
 * Per feedback RI #1, #2, #3, #17, #18:
 *   - badge + heading + paragraph + buttons grouped in one container
 *   - 5rem gap between content group and phone (more air)
 *   - secondary button no border (default now), fixed width 15.375rem = 246px
 *   - primary button width matches secondary
 *   - h1 overflow visible
 */
/* Section now grows with content (no 100svh) so the phone is fully visible per latest mobile feedback.
   Gap heading↔phone = spacing-3 (3rem). */
/* Desktop: 100svh restored per latest #2 desktop ("оставь все как было"); mobile keeps natural height.
   Padding-top adapts to Nav: 3.75rem mobile / 5rem desktop. */
/* Mobile: padding-bottom 0 per latest #2 (was 3rem). Desktop keeps 100svh height + no bottom padding. */
export default function AboutHero() {
  return (
    <section
      id="top"
      className="relative w-full bg-page-bg overflow-hidden flex flex-col pt-[3.75rem] md:pt-[5rem] md:h-[100svh] pb-0 md:pb-0"
    >
      <BgFeatures />

      {/* Container fills section height on desktop (flex-1) so the phone wrapper can be mt-auto pinned to bottom. */}
      <div
        className="relative mx-auto w-full max-w-content container-px flex flex-col items-center text-center md:flex-1"
        style={{ paddingTop: '2.5rem', gap: '3rem', zIndex: 1 }}
      >
        {/* Content group — eyebrow + (heading+paragraph) + buttons */}
        <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
          <HeroEyebrow>Открыто для инвесторов</HeroEyebrow>

          {/* Heading + paragraph — gap spacing-1 (1rem) per latest feedback */}
          <div className="flex flex-col items-center" style={{ gap: '1rem', overflow: 'visible' }}>
            <h1
              className="font-inter-tight font-semibold text-h1-semi text-transparent gradient-text whitespace-pre-line"
              style={{
                backgroundImage: 'var(--gradient-headline)',
                /* text-h1-semi has line-height:0.95 — descender on "p" in "Pre-IPO." clips against
                   the gradient-text clip box. padding-bottom:0.15em lets the h1 "hug" the full glyphs. */
                paddingBottom: '0.15em',
                overflow: 'visible',
              }}
            >
              {HERO.title}
            </h1>
            <p
              className="font-inter-tight font-medium text-paragraph text-white/60"
              style={{ maxWidth: '37.5rem' }}
            >
              {HERO.sub}
            </p>
          </div>

          {/* CTA row — mobile: BtnOwn size="S" (3rem) full-width capped at 30rem; sm+: size L fixed 15.375rem each, centered.
              `items-center sm:justify-center` hugs/centers buttons inside the column per RI desktop #1 feedback. */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center w-full max-w-[30rem] sm:max-w-none"
            style={{ gap: '0.5rem' }}
          >
            <BtnOwn
              size="S"
              hideIcon
              className="w-full sm:hidden"
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            >{HERO.primary}</BtnOwn>
            <BtnOwn
              size="S"
              hideIcon
              variant="secondary"
              className="w-full sm:hidden"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >{HERO.secondary}</BtnOwn>
            <BtnOwn
              size="L"
              hideIcon
              className="hidden sm:flex sm:w-auto"
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            >{HERO.primary}</BtnOwn>
            <BtnOwn
              size="L"
              hideIcon
              variant="secondary"
              className="hidden sm:flex sm:w-auto"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >{HERO.secondary}</BtnOwn>
          </div>
        </div>

        {/* Phone mockup — Mobile: phone renders at natural size (no clip) per 2026-05-28 feedback RI #5
            (user reverted earlier 21rem clip — phone was "крайне маленький"). Width clamp controls scale.
            Desktop: mt-auto pinned to bottom of the 100svh section. */}
        <motion.img
          src="/img/is/investors-iphone-image.webp"
          alt="Axevil — мобильное приложение"
          className="pointer-events-none md:!max-h-none mx-auto md:mt-auto"
          style={{
            width: 'clamp(18rem, 35vw, 30rem)',
            maxWidth: '30rem',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'top',
            display: 'block',
          }}
          loading="eager"
          {...PRELOAD_DEVICES_MOTION}
        />
      </div>
    </section>
  )
}
