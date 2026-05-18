import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'en' | 'ru'

export const translations = {
  en: {
    // Nav
    nav: {
      audience: 'Audience', whyAttend: 'Why attend', agenda: 'Agenda',
      speaker: 'Speaker', schedule: 'Schedule', reserve: 'Reserve a seat',
    },
    // Hero
    hero: {
      badge: 'June 4, 2026 · 19:00 MSK / 18:00 CEST · Zoom · 60 minutes',
      heading: 'How to add private markets to your HNWI portfolios',
      sub: 'A closed-door session for private banking managers, family offices and independent capital advisors',
      cta: 'Register for webinar',
      stats: '$150M AUM · 1,000+ investors · 33 portfolio companies',
    },
    // WhoFor
    whoFor: {
      label: '1.0 Audience', heading: 'Who this webinar is for',
      cards: [
        { n: '1.0', title: 'Wealth managers & RIAs', body: "You're under pressure to differentiate beyond public ETFs. We'll show you a defensible private-markets sleeve you can introduce without overhauling your allocation model." },
        { n: '2.0', title: 'Family Offices', body: 'You already know private markets work — the question is access, vehicle selection, and vintage discipline. We\'ll walk through the approach used by mid-sized single-family offices.' },
        { n: '3.0', title: 'Independent capital advisors', body: 'You manage relationships with HNWIs but lack institutional infrastructure. We\'ll share a plug-in framework your clients can access in 30 days.' },
      ],
    },
    // WhyAxevil
    whyAxevil: {
      label: '2.0 Why Axevil hosts this',
      heading: 'Built by people who run private markets — not just discuss them.',
      link: 'See the Axevil platform',
      stats: [
        { value: '$150M', label: 'AUM' },
        { value: '1,000+', label: 'Investors' },
        { value: '35', label: 'Top-tier companies' },
        { value: '100+', label: 'Partners' },
        { value: '7', label: 'Exits (IPO + Secondary)' },
      ],
    },
    // WhyAttend
    whyAttend: {
      label: '3.0 Why attend', heading: "What you'll learn",
      cta: 'Reserve your seat',
      cards: [
        { metric: '$13T → $20T', metricSub: 'AUM 2025 → 2030F · Preqin', title: 'How private markets are evolving in 2026', body: "What's actually happening on the market — and what wealth managers should expect through the rest of the year." },
        { metric: '89%', metricSub: 'of WMs learn private deals from media · Axevil survey, 2026', title: 'Access to private markets', body: 'What to watch for when entering a deal, and how competition for the best companies is reshaping who gets allocation.' },
        { metric: '2.4–3.1×', metricSub: 'Late-stage venture TVPI · vintage 2018–2020 · Pitchbook NVCA', title: 'Sectors with hidden alpha — AI, fintech, deep tech', body: 'Where the real opportunities are this year, and which segments are crowded out or overpriced.' },
        { metric: '2×', metricSub: 'Secondary volume growth 2020 → 2024 · Jefferies', title: 'How secondary markets make private companies liquid.', body: 'Why secondaries are rewriting the liquidity picture for private holdings — with real cases from the Axevil Capital portfolio.' },
      ],
    },
    // WhatCover
    whatCover: {
      label: '4.0 Agenda', heading: "What we'll cover",
      items: [
        { n: '1.0', body: 'The math of private market alpha — sources, persistence and net-of-fee evidence over the last two decades.' },
        { n: '2.0', body: 'HNWI portfolio construction — four real allocation examples from 5% sleeve to 30% institutional-grade.' },
        { n: '3.0', body: 'Access vehicles compared — SPVs, feeders, secondaries, evergreen, pre-IPO.' },
        { n: '4.0', body: 'A 90-day plan to introduce private markets to your existing client base without disrupting current allocations.' },
        { n: '5.0', body: 'Live Q&A.' },
      ],
    },
    // Speaker
    speaker: {
      label: '6.0 About Speaker', heading: 'Speaker',
      name: 'Taras Chumachenko',
      role: 'Co-founder & Managing Partner, Axevil Capital',
      bio: '10+ years in alternative investments. Co-founder of Axevil Capital — a digital private equity platform with $150M AUM, 1,000+ investors and 100+ wealth-management partners. Hosts the firm\'s quarterly research briefings and live Q&A sessions on private markets strategy.',
    },
    // Schedule
    schedule: {
      label: '5.0 Schedule', heading: 'Webinar schedule',
      rows: [
        { title: 'Context', desc: 'Why private markets grew by $7T in 5 years', time: '0:00 ~ 0:05' },
        { title: 'Portfolio architecture', desc: 'HNWI portfolio construction: what private allocation actually looks like at scale', time: '0:05 ~ 0:20' },
        { title: 'Access mechanics', desc: 'SPVs, feeders, evergreen, secondaries — how access actually works', time: '0:20 ~ 0:35' },
        { title: 'Implementation', desc: 'A 90-day plan to introduce private markets to your clients', time: '0:35 ~ 0:50' },
        { title: 'Live Q&A', desc: 'Open discussion — your questions answered', time: '0:50 ~ 1:00' },
      ],
    },
    // Form
    form: {
      label: '7.0 Registration', heading: 'Register for the webinar',
      sub: "Leave your details — we'll send registration confirmation and a calendar link.",
      fields: { email: 'Email', name: 'Name', position: 'Position', company: 'Company / Family Office', phone: 'Phone', contact: 'Contact me personally to discuss investment opportunities' },
      submit: 'Register',
      sending: 'Sending...',
      success: {
        heading: "Thank you — you're registered for the event.",
        bodyEmail: "Confirmation with the Zoom link and a calendar invite has been sent to your inbox.",
        highlight: "Don't miss future Axevil Capital events.",
        bodyTelegram: 'Extra session materials, reminders and announcements about upcoming events — in our Telegram bot. Join us.',
        primary: 'Open Telegram bot',
        close: 'Close',
      },
      disclaimer: "By registering you agree to receive the recording and related Axevil Capital communications. Unsubscribe anytime.",
    },
    // Footer
    footer: {
      entity: 'Axevil Capital, LLC',
      contactLabel: 'Contact',
      contactEmail: 'info@axevil.com',
      links: [
        { label: 'Privacy Policy', href: '/legal/en/privacy.html' },
        { label: 'Cookie Policy', href: '/legal/en/cookies.html' },
        { label: 'Terms of Use', href: '/legal/en/terms.html' },
        { label: 'Contact', href: 'mailto:info@axevil.com' },
      ],
      disclaimer:
        'Axevil Capital, LLC is a US-registered company (Delaware, #6832739) with Exempt Reporting Adviser (ERA) status, regulated by the U.S. Securities and Exchange Commission (SEC #802-126907). For professional investors, wealth managers, family offices and accredited investors only. Information on this site and in the webinar is provided for general informational and educational purposes only and does not constitute investment, legal, tax or other professional advice, an offer or a solicitation to buy or sell any security or fund interest. Private market investments are illiquid, long-term and high-risk; past performance is not indicative of future results.',
      copy: '© 2021–2026 Axevil Capital, LLC. All rights reserved.',
    },
  },
  ru: {
    nav: {
      audience: 'Аудитория', whyAttend: 'Зачем идти', agenda: 'Программа',
      speaker: 'Спикер', schedule: 'Расписание', reserve: 'Записаться',
    },
    hero: {
      badge: '4 июня 2026 · 19:00 МСК / 18:00 CEST · Zoom · 60 минут',
      heading: 'Как добавить private markets в портфели HNWI-клиентов',
      sub: 'Закрытая сессия для private banking менеджеров, family offices и независимых советников',
      cta: 'Зарегистрироваться',
      stats: '$150M AUM · 1,000+ инвесторов · 33 портфельные компании',
    },
    whoFor: {
      label: '1.0 Аудитория', heading: 'Для кого этот вебинар',
      cards: [
        { n: '1.0', title: 'Wealth managers и RIA', body: 'Вы под давлением дифференцировать портфели за пределами публичных ETF. Мы покажем защищаемую private-markets аллокацию, которую можно ввести без перестройки модели.' },
        { n: '2.0', title: 'Family Offices', body: 'Вы знаете, что private markets работают — вопрос в доступе, выборе инструментов и дисциплине vintage. Разберём подход, который используют средние семейные офисы.' },
        { n: '3.0', title: 'Независимые советники', body: 'Вы управляете отношениями с HNWI, но без институциональной инфраструктуры. Поделимся plug-in фреймворком, доступным клиентам за 30 дней.' },
      ],
    },
    whyAxevil: {
      label: '2.0 Почему Axevil проводит это',
      heading: 'Создано людьми, которые работают на private markets — не просто обсуждают.',
      link: 'Посмотреть платформу Axevil',
      stats: [
        { value: '$150M', label: 'AUM' },
        { value: '1,000+', label: 'Инвесторов' },
        { value: '35', label: 'Топ-компаний' },
        { value: '100+', label: 'Партнёров' },
        { value: '7', label: 'Выходов (IPO + Secondary)' },
      ],
    },
    whyAttend: {
      label: '3.0 Зачем идти', heading: 'Что вы узнаете',
      cta: 'Занять место',
      cards: [
        { metric: '$13T → $20T', metricSub: 'AUM 2025 → 2030F · Preqin', title: 'Как развиваются private markets в 2026', body: 'Что реально происходит на рынке — и что ожидать wealth managers до конца года.' },
        { metric: '89%', metricSub: 'WM узнают о private сделках из СМИ · Опрос Axevil, 2026', title: 'Доступ к private markets', body: 'На что смотреть при входе в сделку, и как конкуренция за лучшие компании меняет правила.' },
        { metric: '2,4–3,1×', metricSub: 'Late-stage venture TVPI · vintage 2018–2020 · Pitchbook NVCA', title: 'Секторы со скрытой альфой — AI, fintech, deep tech', body: 'Где реальные возможности в этом году, и какие сегменты перегреты или переоценены.' },
        { metric: '2×', metricSub: 'Рост объёма secondary 2020 → 2024 · Jefferies', title: 'Как secondary рынки делают private компании ликвидными.', body: 'Почему secondary переписывают картину ликвидности — с реальными кейсами из портфеля Axevil Capital.' },
      ],
    },
    whatCover: {
      label: '4.0 Программа', heading: 'Что мы разберём',
      items: [
        { n: '1.0', body: 'Математика альфы private markets — источники, устойчивость и данные net-of-fee за последние два десятилетия.' },
        { n: '2.0', body: 'Конструкция портфеля HNWI — четыре реальных примера аллокации от 5% до 30% институционального уровня.' },
        { n: '3.0', body: 'Сравнение инструментов доступа — SPV, фидеры, secondary, evergreen, pre-IPO.' },
        { n: '4.0', body: '90-дневный план внедрения private markets для существующей клиентской базы без перестройки аллокаций.' },
        { n: '5.0', body: 'Q&A в прямом эфире.' },
      ],
    },
    speaker: {
      label: '6.0 О спикере', heading: 'Спикер',
      name: 'Тарас Чумаченко',
      role: 'Co-founder & Managing Partner, Axevil Capital',
      bio: '10+ лет в альтернативных инвестициях. Сооснователь Axevil Capital — цифровой платформы private equity с AUM $150M, 1,000+ инвесторами и 100+ партнёрами по управлению капиталом. Ведёт ежеквартальные исследовательские брифинги и Q&A по стратегии private markets.',
    },
    schedule: {
      label: '5.0 Расписание', heading: 'Расписание вебинара',
      rows: [
        { title: 'Контекст', desc: 'Почему private markets выросли на $7T за 5 лет', time: '0:00 ~ 0:05' },
        { title: 'Архитектура портфеля', desc: 'Конструкция HNWI портфеля: как выглядит private аллокация в масштабе', time: '0:05 ~ 0:20' },
        { title: 'Механика доступа', desc: 'SPV, фидеры, evergreen, secondary — как работает доступ на практике', time: '0:20 ~ 0:35' },
        { title: 'Внедрение', desc: '90-дневный план введения private markets для клиентов', time: '0:35 ~ 0:50' },
        { title: 'Q&A в прямом эфире', desc: 'Открытое обсуждение — ваши вопросы', time: '0:50 ~ 1:00' },
      ],
    },
    form: {
      label: '7.0 Регистрация', heading: 'Зарегистрироваться на вебинар',
      sub: 'Оставьте данные — пришлём подтверждение и ссылку в календарь.',
      fields: { email: 'Email', name: 'Имя', position: 'Должность', company: 'Компания / Family Office', phone: 'Телефон', contact: 'Свяжитесь лично для обсуждения инвестиционных возможностей' },
      submit: 'Зарегистрироваться',
      sending: 'Отправка...',
      success: {
        heading: 'Спасибо — вы зарегистрированы на встречу.',
        bodyEmail: 'Подтверждение со ссылкой на Zoom и приглашением в календарь уже отправили на вашу почту.',
        highlight: 'Не пропустите мероприятия Axevil Capital.',
        bodyTelegram: 'Дополнительные материалы по встрече, напоминания и анонсы новых мероприятий — в нашем Telegram-боте. Переходите.',
        primary: 'Перейти в Telegram-бота',
        close: 'Закрыть',
      },
      disclaimer: 'Регистрируясь, вы соглашаетесь получать запись вебинара и материалы Axevil Capital. Отписаться можно в любой момент.',
    },
    footer: {
      entity: 'Axevil Capital, LLC',
      contactLabel: 'Контакт',
      contactEmail: 'info@axevil.com',
      links: [
        { label: 'Конфиденциальность', href: '/legal/ru/privacy.html' },
        { label: 'Политика cookie', href: '/legal/ru/cookies.html' },
        { label: 'Условия использования', href: '/legal/ru/terms.html' },
        { label: 'Контакты', href: 'mailto:info@axevil.com' },
      ],
      disclaimer:
        'Axevil Capital, LLC — компания, зарегистрированная в США (штат Делавэр, #6832739), со статусом Exempt Reporting Adviser (ERA), регулируется Комиссией по ценным бумагам и биржам США (SEC #802-126907). Только для профессиональных инвесторов, wealth-менеджеров, family offices и аккредитованных инвесторов. Материалы Сайта и вебинара предоставлены в общих информационных и образовательных целях и не являются инвестиционным, юридическим, налоговым или иным профессиональным советом, офертой или приглашением совершить сделку с ценными бумагами или долями в фондах. Инвестиции в private markets неликвидны, носят долгосрочный характер и сопряжены с высокими рисками; прошлая доходность не гарантирует будущих результатов.',
      copy: '© 2021–2026 Axevil Capital, LLC. Все права защищены.',
    },
  },
}

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations['en']
}

const LangContext = createContext<LangContextType>({
  lang: 'ru', setLang: () => {}, t: translations.ru,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
