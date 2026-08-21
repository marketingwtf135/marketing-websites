import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { analytics } from '../../lib/analytics'
import { asset } from '../../lib/asset'
import NLLeadForm from './NLLeadForm'

/**
 * Social proof beside the closing form (client feedback 2026-07-23: "форма ок. Добавить
 * social proof: «1200+ wealth-менеджеров уже подписаны» + logo-band институций").
 * The count is the client's figure.
 */
const SUBSCRIBER_COUNT = '1200+ wealth-менеджеров уже подписаны'

/**
 * Institution logo band. Empty until the client supplies cleared logo files — we do not
 * put institution names on the page that we cannot evidence. Drop `{src, alt}` entries in
 * and the band renders logos instead of the audience-mix fallback below; no other change
 * is needed.
 */
const INSTITUTION_LOGOS: { src: string; alt: string }[] = []

/** What the list is made of — true, checkable, and enough of a signal without logos. */
const SUBSCRIBER_MIX = ['Family offices', 'Private banks', 'Независимые advisors', 'Инвест-бутики']

export default function NLForm() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    // Two signals, one observer: the funnel's last step reached ("скролл до финала"),
    // and the form itself in view.
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { analytics.finalReached(); analytics.formView('final'); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="nl-form" ref={sectionRef}
      className="relative w-full flex items-start sm:items-center justify-center"
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(to top, black 77.85%, #080808 100%)',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Shine background — right-0 top-0, 100% width per Figma 784-13986 */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none" aria-hidden>
        <img src={asset('/img/newsletter/newsletter-shine-bg.png')}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          alt="" className="w-full h-full object-cover object-right-top" loading="lazy" />
      </div>

      <motion.div
        className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[80px] pt-0 pb-[3.75rem] sm:py-[5rem] lg:py-[6.25rem] flex flex-col items-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[1rem] items-center justify-center w-full max-w-[600px] mb-10">
          <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>5.0</span>
            <span style={{ color: 'var(--black-900)' }}>Подписка на дайджест</span>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', overflow: 'visible', backgroundImage: 'linear-gradient(103.042deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', whiteSpace: 'pre-line' }}>
              {'Подписаться \nна дайджест'}
            </h2>
            <p className="font-inter-tight font-medium"
              style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)", lineHeight: 1.35, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.36px", maxWidth: "31.25rem" }}>
              Свежий выпуск — в почте после подписки
            </p>
          </div>

          <SocialProof />
        </div>

        {/* Форма — тот же компонент, что в первом экране (Татьяна: «форму делаем
            единообразную», «единобразную как в hero-блоке»).

            Раньше здесь была своя форма на пять полей: email, имя, должность, компания и
            AUM-вилка. Должность, компания и AUM ушли — иначе единообразия не получается, а
            две разные формы на одной странице и были причиной правки. Если эти поля нужны
            для квалификации лида, их лучше собирать после подписки: каждое лишнее поле на
            входе — повод уйти.

            Вместе со старой формой ушли её собственная валидация, состояние отправки, экран
            «спасибо», выпадающий список AUM и скрытое поле страны — всё это уже есть внутри
            NLLeadForm и общего отправщика. Аналитика блока осталась здесь: «дочитал до
            финала» и показ формы.

            maxWidth 34rem — как в первом экране, иначе подсказка «Телефон (необязательно)»
            не помещается рядом с email. */}
        <NLLeadForm
          source="final"
          maxWidth="34rem"
          note="Отписаться — одной кнопкой в любом письме. Подписываясь, соглашаетесь с обработкой данных"
        />
      </motion.div>
    </section>
  )
}

/** Subscriber count + who they are — the reassurance that sits above the fields. */
function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="font-inter-tight font-semibold text-white flex items-center gap-2 text-center"
        style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        <span className="badge-pulse shrink-0 block rounded-full" aria-hidden
          style={{ width: '0.5rem', height: '0.5rem', background: 'var(--status-open)' }} />
        {SUBSCRIBER_COUNT}
      </p>

      {INSTITUTION_LOGOS.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {INSTITUTION_LOGOS.map(logo => (
            <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy"
              className="block shrink-0 opacity-60"
              style={{ height: 'clamp(1.25rem, 1.8vw, 1.75rem)', width: 'auto' }} />
          ))}
        </div>
      ) : (
        <ul className="flex flex-wrap items-center justify-center gap-2 list-none p-0 m-0">
          {SUBSCRIBER_MIX.map(item => (
            <li key={item}
              className="font-inter-tight font-medium whitespace-nowrap rounded-full px-3 py-1.5"
              style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-300)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

