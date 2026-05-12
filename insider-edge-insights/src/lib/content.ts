export type Lang = "en" | "ru";

export const content = {
  en: {
    nav: { lang: "RU", cta: "Request Access" },
    hero: {
      label: "PRIVATE MARKETS RESEARCH",
      h1: "Private market returned 7x more than Nasdaq in 2025",
      sub: "An in-depth analytical report on 10+ high-growth pre-IPO technology companies — from macroeconomic drivers to individual company deep-dives with financial projections and exit scenarios.",
      cta: "Request Access",
    },
    authority: {
      tag: "RESEARCH METHODOLOGY",
      lead: "Our analysis combines proprietary valuation models, secondary market transaction data, and deep operational analysis of each company. Every case study includes financial projections, competitive positioning, risk assessment, and exit scenario modeling based on comparable public market transactions.",
      stats: [
        { label: "Top-20 Private Companies Return (2025)", value: "+148%" },
        { label: "Nasdaq Return (Same Period)", value: "+20%" },
        { label: "Companies Analyzed", value: "10+" },
      ],
      tagline: "Research prepared by professionals with backgrounds at Societe Generale, Aton, Finam, and Angel Squad.",
    },
    value: {
      tag: "REPORT CONTENTS",
      h2: "Structure of the analysis",
      cards: [
        { num: "01", title: "Macroeconomic Overview and Private Market Performance", desc: "Comparison of top-20 private tech companies index vs. Nasdaq. Analysis of how trade wars, geopolitical shifts, and AI progress created a 7x return gap in 2025." },
        { num: "02", title: "IPO Season 2025: $44B Raised, 250+ Listings", desc: "After a 3-year lull, 2025 became a record year for tech IPOs. Analysis of 16 major listings including Figma, Klarna, and Circle." },
        { num: "03", title: "Macro Drivers: Soft Landing and Fed Rate Cuts", desc: "How falling inflation, Fed rate cuts, and stable consumer spending create favorable conditions for tech valuations and upcoming IPO windows." },
        { num: "04", title: "10+ Company Deep-Dives with Exit Scenarios", desc: "Case studies on SpaceX, Anthropic, Stripe, Revolut, Databricks, Scale AI, Klarna, Canva, Kraken — financial metrics, growth drivers, and exit valuations." },
      ],
    },
    timing: {
      tag: "MARKET CONTEXT",
      h2: "Why pre-IPO investing outperforms",
      p: "In 2025, the top-20 private technology companies delivered +148% returns while Nasdaq returned only +20%. Early access to companies like SpaceX, Anthropic, and Stripe before their public listings represents a significant alpha opportunity.",
      table: [
        { metric: "Entry Point", private: "12–24 months before IPO", public: "Day of listing or after" },
        { metric: "2025 Return", private: "+148% (top-20 index)", public: "+20% (Nasdaq)" },
        { metric: "Access", private: "Qualified investors via Axevil", public: "Open market" },
        { metric: "Liquidity", private: "Secondary market / IPO exit", public: "Full liquidity" },
      ],
    },
    preview: {
      tag: "SAMPLE DATA",
      h2: "Excerpts from the report",
      slides: [
        { title: "Top-20 Private Companies vs. Nasdaq (2025)", type: "waterfall" },
        { title: "Portfolio Highlights", type: "table" },
        { title: "2025 IPO Highlights", type: "timeline" },
      ],
    },
    authors: {
      tag: "RESEARCH TEAM",
      h2: "Report authors",
      people: [
        { name: "Alexander Ivanov", role: "Investment Banking — 12 years", desc: "Finam, Otkritie, Aton. Structured $500M+ in private placements." },
        { name: "Taras Chumachenko", role: "Alternative Investments — 10 years", desc: "Société Générale. Institutional portfolio management across three continents." },
        { name: "Vladislav Solovev", role: "Private Markets — 5 years", desc: "Angel Squad (US). Evaluated 200+ pre-IPO companies." },
        { name: "Andrey Revenko", role: "HNW/UHNW Advisory", desc: "Former CEO, Kalinka Middle East. $1B+ in client assets under advisory." },
      ],
    },
    final: {
      h2: "Request the full report",
      p: "Provide your details to receive the complete investment analysis of 10+ high-growth private technology companies.",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      phonePlaceholder: "Phone",
      telegramPlaceholder: "Telegram username",
      companyPlaceholder: "Company",
      positionPlaceholder: "Position",
      rolePlaceholder: "Who are you?",
      roleOptions: ["Financial Advisor", "Family Office", "Asset Manager", "Venture Investor", "Private Investor", "Other"],
      cta: "Request Access",
      bullets: ["In-depth analysis of private market outperformance", "10+ company deep-dives with exit scenarios", "Prepared by professionals from Societe Generale, Aton, Finam"],
    },
  },
  ru: {
    nav: { lang: "EN", cta: "Запросить доступ" },
    hero: {
      label: "АНАЛИТИКА ЧАСТНЫХ РЫНКОВ",
      h1: "Ключевые события частного рынка 2025 и прогноз 2026",
      sub: "Глубокий аналитический отчёт по 10+ быстрорастущим pre-IPO технологическим компаниям — от макроэкономических драйверов до детальных разборов компаний с финансовыми прогнозами и сценариями выхода.",
      cta: "Запросить доступ",
    },
    authority: {
      tag: "МЕТОДОЛОГИЯ ИССЛЕДОВАНИЯ",
      lead: "Наш анализ объединяет проприетарные модели оценки, данные сделок на вторичном рынке и глубокий операционный анализ каждой компании. Каждый кейс включает финансовые прогнозы, конкурентное позиционирование, оценку рисков и моделирование сценариев выхода.",
      stats: [
        { label: "Доходность топ-20 частных компаний (2025)", value: "+148%" },
        { label: "Доходность Nasdaq (тот же период)", value: "+20%" },
        { label: "Проанализировано компаний", value: "10+" },
      ],
      tagline: "Исследование подготовлено специалистами с опытом в Societe Generale, Атон, Финам и Angel Squad.",
    },
    value: {
      tag: "СОДЕРЖАНИЕ ОТЧЁТА",
      h2: "Структура анализа",
      cards: [
        { num: "01", title: "Макроэкономика и геополитика", desc: "Сравнение индекса топ-20 частных технологических компаний с Nasdaq. Анализ того, как торговые войны, геополитические сдвиги и развитие AI создали разрыв доходности в 7 раз в 2025 году." },
        { num: "02", title: "Обзор венчурного рынка", desc: "После 3-летнего затишья 2025 стал рекордным годом для технологических IPO. Анализ 16 крупнейших размещений, включая Figma, Klarna и Circle." },
        { num: "03", title: "AI как главный драйвер", desc: "Как снижение инфляции, снижение ставок ФРС и стабильные потребительские расходы создают благоприятные условия для технологических оценок и предстоящих IPO." },
        { num: "04", title: "Топ-5 отраслей помимо AI", desc: "Кейсы SpaceX, Anthropic, Stripe, Revolut, Databricks, Scale AI, Klarna, Canva, Kraken — финансовые метрики, драйверы роста и оценки при выходе." },
      ],
    },
    timing: {
      tag: "РЫНОЧНЫЙ КОНТЕКСТ",
      h2: "Почему pre-IPO инвестиции опережают рынок",
      p: "В 2025 году топ-20 частных технологических компаний показали доходность +148%, тогда как Nasdaq — лишь +20%. Ранний доступ к компаниям вроде SpaceX, Anthropic и Stripe до их публичного размещения представляет значительную альфа-возможность.",
      table: [
        { metric: "Точка входа", private: "12–24 мес. до IPO", public: "День листинга или позже" },
        { metric: "Доходность 2025", private: "+148% (индекс топ-20)", public: "+20% (Nasdaq)" },
        { metric: "Доступ", private: "Квалифицированные инвесторы через Axevil", public: "Открытый рынок" },
        { metric: "Ликвидность", private: "Вторичный рынок / IPO выход", public: "Полная ликвидность" },
      ],
    },
    preview: {
      tag: "ПРИМЕРЫ ДАННЫХ",
      h2: "Выдержки из отчёта",
      slides: [
        { title: "Топ-20 частных компаний vs Nasdaq (2025)", type: "waterfall" },
        { title: "Основные показатели портфеля", type: "table" },
        { title: "Ключевые IPO 2025", type: "timeline" },
      ],
    },
    authors: {
      tag: "ИССЛЕДОВАТЕЛЬСКАЯ КОМАНДА",
      h2: "Авторы отчёта",
      people: [
        { name: "Александр Иванов", role: "Инвестиционный банкинг — 12 лет", desc: "Финам, Открытие, Атон. Структурировал частные размещения на $500M+." },
        { name: "Тарас Чумаченко", role: "Альтернативные инвестиции — 10 лет", desc: "Société Générale. Управление институциональными портфелями на трёх континентах." },
        { name: "Владислав Соловьев", role: "Частные рынки — 5 лет", desc: "Angel Squad (США). Проанализировал 200+ pre-IPO компаний." },
        { name: "Андрей Ревенко", role: "HNW/UHNW консультирование", desc: "Экс-CEO Kalinka Middle East. Консультирование активов на $1B+." },
      ],
    },
    final: {
      h2: "Запросить полный отчёт",
      p: "Укажите ваши данные для получения полного инвестиционного анализа 10+ быстрорастущих технологических компаний.",
      namePlaceholder: "Имя",
      emailPlaceholder: "Email",
      phonePlaceholder: "Телефон",
      telegramPlaceholder: "Telegram username",
      companyPlaceholder: "Компания",
      positionPlaceholder: "Должность",
      rolePlaceholder: "Кто вы?",
      roleOptions: ["Финансовый советник", "Family Office", "Управляющий активами", "Венчурный инвестор", "Частный инвестор", "Другое"],
      cta: "Запросить доступ",
      bullets: ["Глубокий анализ опережающей доходности частного рынка", "10+ детальных разборов компаний со сценариями выхода", "Подготовлено специалистами Societe Generale, Атон, Финам"],
    },
  },
} as const;
