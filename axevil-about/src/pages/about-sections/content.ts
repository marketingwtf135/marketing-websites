export interface NavLink { label: string; id: string }
export interface ThesisRow { num: string; title: string; stat: string; statLabel: string; copy: string }
export interface Sector { count: string; title: string; companies: string[]; note: string }
export interface Exit { company: string; type: string; metric: string; copy: string; why: string }
export interface Pillar { num: string; title: string; copy: string }
export interface DiagramBox { kicker: string; title: string; copy: string }
export interface LegalMessage { strong: string; rest: string }
export interface Partner { type: string; title: string; copy: string }
export interface Founder { num: string; name: string; role: string; photo: string }
export interface Deal { ticker: string; name: string; sector: string; status: 'open' | 'soon'; statusLabel: string; score: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'Портфель',       id: 'portfolio' },
  { label: 'Выходы',         id: 'exits' },
  { label: 'Инфраструктура', id: 'legal' },
  { label: 'Основатели',     id: 'founders' },
]

export const HERO = {
  eyebrow: 'Axevil Capital · Pre-IPO платформа',
  title: 'Платформа pre-IPO инвестиций в глобальных технологических лидеров',
  sub: 'Строим инфраструктуру доступа к лучшим частным компаниям мира для профессиональных инвесторов и управляющих капиталом.',
  primary: 'Обсудить с инвест-менеджером',
  secondary: 'Получить доступ',
}

export const HERO_DEALS: Deal[] = [
  { ticker: 'SX', name: 'SpaceX', sector: 'Space · Growth equity', status: 'open', statusLabel: 'Открыта', score: '8.4 / 10' },
  { ticker: 'XA', name: 'xAI',    sector: 'AI / Infrastructure',   status: 'soon', statusLabel: 'Скоро',   score: '9.1 / 10' },
  { ticker: 'CR', name: 'Cursor', sector: 'Developer tools',       status: 'open', statusLabel: 'Открыта', score: '8.7 / 10' },
]

export const TRUST_STATS = [
  { num: '$150M',  label: 'под управлением' },
  { num: '1 000+', label: 'инвесторов' },
  { num: '35',     label: 'компаний в портфеле' },
  { num: '8',      label: 'успешных выходов' },
]
export const COMPLIANCE = 'SEC Exempt Reporting Adviser · CRD #802-126907 · FINRA Member · CRD #323970'

export const THESIS = {
  eyebrow: 'Почему private markets',
  title: 'Стоимость создаётся до IPO — рост на частном рынке.',
  lead: 'Топ-компании остаются частными в среднем 12 лет и формируют ~80% своей стоимости до момента выхода на биржу. IPO лишь фиксирует результат, основной рост уже состоялся.',
  rows: [
    { num: '01', title: 'Капитал перераспределяется', stat: '86%', statLabel: 'family offices уже инвестируют в private markets',
      copy: 'Family offices, HNWI и институциональный капитал системно перераспределяют капитал из публичных рынков в частные — следуя за зрелой ликвидной инфраструктурой и доходностью.' },
    { num: '02', title: 'Стоимость создаётся до IPO', stat: '80%', statLabel: 'стоимости top-компаний создаётся на частном этапе',
      copy: 'IPO больше не начало роста — это момент, когда рынок признаёт состоявшийся рост. Топ-децильные сделки дают 60–83% IRR на стадиях Series E–H, тогда как пост-IPO доходность обычно падает до процентов.' },
    { num: '03', title: 'Структурное опережение', stat: '2×', statLabel: 'Top-50 частных компаний vs NASDAQ-100 за 5 лет',
      copy: 'Доходность топ-50 частных компаний в 2 раза выше публичных бенчмарков. Доступ открывает секторы, которых почти нет в публике: космос, blockchain, AI, deeptech.' },
  ] as ThesisRow[],
  sources: 'Источники: Forbes Family Office Insights 2025 · KKR Global Wealth Allocation 2025 · Forge Global · Preqin Index 50',
}

export const PORTFOLIO = {
  eyebrow: 'Инвестиционный фокус Axevil Capital',
  title: '35 компаний в портфеле — от космоса и AI до blockchain и региональных супераппов.',
  lead: 'Инвестируем в технологических лидеров по всему миру — США, Европа, Ближний Восток, Азия.',
  sectors: [
    { count: '12+', title: 'AI и инфраструктура', companies: ['Anthropic', 'xAI', 'Databricks', 'Cursor', 'Glean', 'Figure'],
      note: 'Включая 3 AI Fund — индексный продукт по 12–15 топ-AI-компаниям.' },
    { count: '3', title: 'Финтех-инфраструктура', companies: ['Stripe', 'Klarna', 'Revolut'],
      note: 'Платёжная инфраструктура, BNPL и цифровые финансовые сервисы.' },
    { count: '4', title: 'Blockchain и крипто', companies: ['Kraken', 'Circle', 'Consensys', 'Blockdaemon'],
      note: 'Биржи, стейблкоины и инфраструктура. Регулируемые игроки.' },
    { count: '5+', title: 'Enterprise tech', companies: ['Confluent', 'Netskope', 'Tanium', 'Automation Anywhere', 'Canva'],
      note: 'B2B-инфраструктура, кибербезопасность, RPA.' },
    { count: '2', title: 'Deeptech и космос', companies: ['SpaceX', 'Neuralink'],
      note: 'Космическая инфраструктура и нейроинтерфейсы.' },
    { count: '4', title: 'Региональные супераппы', companies: ['Uzum', 'Rappi', 'Toss', 'Tamara'],
      note: 'Экосистемы для e-commerce, финтеха, доставки и повседневных сервисов в развивающихся рынках.' },
  ] as Sector[],
  leadmagnet: {
    tag: 'PRE-IPO INSIDER · Q1 2026',
    coverTitle: 'Портфель Axevil: компании, секторы, винтажи',
    coverFoot: 'Axevil Capital · quarterly report',
    eyebrow: 'Результаты',
    title: 'Скачайте квартальный отчёт Q1 2026',
    body: 'Рассказываем, как команда Axevil провела первый квартал 2026 года: новые компании в портфеле, переоценки и выходы, текущие открытые инвестиционные возможности.',
    cta: 'Скачать отчёт',
  },
}

export const EXITS = {
  eyebrow: 'Track record · кейсы ликвидности',
  title: 'Примеры успешных выходов',
  lead: 'Для private markets ликвидность больше не сводится только к IPO. Вторичный рынок стал полноценным сценарием выхода: он повышает ликвидность класса активов и позволяет инвестору зафиксировать результат ещё до выхода компании на биржу.',
  cards: [
    { company: 'Confluent', type: 'IPO · июнь 2021', metric: '256% IRR',
      copy: 'Лидер в потоковой обработке данных на базе Apache Kafka. На момент входа — $300 млн выручки и рост +60% год к году.',
      why: 'Первый exit Axevil: 6 месяцев от структурирования сделки до листинга.' },
    { company: 'Circle', type: 'IPO · июнь 2025', metric: 'IPO 2025',
      copy: 'Эмитент USDC, второго по величине стейблкоина в мире. Капитализация USDC — $62+ млрд, доля рынка выросла с 20% до 25,5%.',
      why: 'Выход менее чем через 3 месяца после структурирования сделки.' },
    { company: 'SpaceX', type: 'secondary · 2026', metric: '200% IRR',
      copy: 'Мировой лидер запусков и спутниковой инфраструктуры. Частичный выход на вторичном рынке при оценке $527 млрд до IPO.',
      why: 'Уникальный кейс раннего входа с фиксацией части прибыли на вторичном рынке до IPO.' },
    { company: 'Scale AI', type: 'спец. дивиденд · 2025', metric: 'Дивиденд + акции',
      copy: 'Платформа для подготовки данных и обучения AI-моделей. Инвесторы получили специальный дивиденд после сделки с Meta и остались акционерами компании.',
      why: 'Пример фиксации прибыли ещё до IPO без выхода из позиции полностью.' },
  ] as Exit[],
  foot: '8 выходов с 2021 года. Обсудить состав портфеля и его результаты →',
}

export const WHY = {
  eyebrow: 'Что делает Axevil другим',
  title: 'Меняем правила игры на рынке private equity.',
  lead: 'Private market по-прежнему остаётся закрытым и фрагментированным рынком. Миссия Axevil — упростить доступ к этому классу активов, сделав его прозрачным и удобным.',
  pillars: [
    { num: '01', title: 'Технологии вместо барьеров',
      copy: '100% цифровой процесс — от KYC и подписания SPV agreement до оплаты и трекинга позиции.' },
    { num: '02', title: 'Доступ к лучшим компаниям рынка',
      copy: 'Мы тщательно анализируем компании, которые попадают в наш пайплайн, предоставляя детальную информацию по каждому инвестиционному кейсу для принятия взвешенного решения.' },
    { num: '03', title: 'Готовая юридическая инфраструктура',
      copy: 'Управляющая компания и фонд работают в регулируемом контуре SEC и используют лучшие практики венчурного инвестирования для защиты капитала инвестора.' },
  ] as Pillar[],
}

export const LEGAL = {
  eyebrow: 'Лучшие практики венчурной индустрии',
  title: 'Как структурируется ваша инвестиция.',
  lead: 'Axevil — это технологический и операционный слой.',
  boxes: [
    { kicker: 'Управляющая компания', title: 'Axevil Capital', copy: 'SEC ERA #802-126907 · FINRA Member CRD #323970. Находит актив, создаёт фонд, ведёт инвестора.' },
    { kicker: 'Series SPV · Delaware', title: 'Alextar VC LLC', copy: 'SPV-ячейки под каждую сделку. Капитал каждой SPV на 100% состоит из акций портфельной компании.' },
    { kicker: 'Инвестор', title: 'Доля в SPV', copy: 'Инвестор получает долю в SPV пропорционально участию и Capital Account Statement.' },
  ] as DiagramBox[],
  messages: [
    { strong: 'Отдельная SPV под каждую сделку.', rest: 'Акции одной портфельной компании находятся в отдельной ячейке фонда и не смешиваются с другими сделками.' },
    { strong: 'Доли инвесторов отражаются внутри SPV.', rest: 'Акции в SPV принадлежат инвесторам пропорционально их участию. Отношения регулирует SPV Agreement.' },
    { strong: 'Отчётность фиксирует право участия.', rest: 'Сделка регистрируется через Form D, а инвестор получает Capital Account Statement.' },
  ] as LegalMessage[],
  partners: [
    { type: 'Регулятор', title: 'SEC + FINRA', copy: 'Ежегодный reporting, Form D filing на каждую сделку, постоянный oversight.' },
    { type: 'Юридический партнёр', title: 'Buzko Krasnov', copy: 'Внешний legal counsel: SPV agreements, subscription docs, secondary transactions.' },
    { type: 'Операционное сопровождение', title: 'Документы и отчётность', copy: 'KYC, статус аккредитованного инвестора, SPV Agreement, Form D, Capital Account Statement и налоговые формы W-8BEN / W-9 / Schedule K-1.' },
    { type: 'Инвестиционный партнёр', title: 'FinSight Ventures', copy: '20+ лет на рынке, $400M инвестиций в 90 компаний, 31 выход, 41× MOIC.' },
    { type: 'Платежи', title: 'Banking Partners', copy: 'SWIFT-переводы, wire instructions, regulated payment flow.' },
    { type: 'Delaware', title: 'Registration Agents', copy: 'Регистрация SPV и поддержание юридического адреса в Делавэре.' },
  ] as Partner[],
}

export const FOUNDERS = {
  eyebrow: 'Письмо от основателей',
  title: 'Почему мы\nделаем Axevil',
  // Order + content per Figma 1426:5382 (01 Александр, 02 Тарас)
  people: [
    { num: '01', name: 'Александр Иванов', role: 'Co-founder & Managing Partner', photo: '/img/alexander-photo.png' },
    { num: '02', name: 'Тарас Чумаченко',  role: 'Co-founder & Managing Partner', photo: '/img/taras-photo.png' },
  ] as Founder[],
  letter: [
    'Мы запустили Axevil в 2020 году, потому что видели разрыв между тем, как устроен частный рынок сегодня, и тем, как он должен быть устроен для частного инвестора.',
    'Раньше доступ к SpaceX, Stripe или Databricks был только у больших институциональных фондов и узкого круга family offices с прямыми связями в Кремниевой долине.',
    'Мы построили технологическую и юридическую инфраструктуру, которая убирает этот барьер. Не упрощая суть — оставляя институциональный процесс, due diligence, регулирование и custody.',
    'Если у вас есть вопросы о том, как это работает на практике — запишитесь на 30-минутный звонок. Один из нас или старший инвестиционный советник Axevil ответит лично.',
  ],
  signatures: [
    { name: 'Тарас Чумаченко',  role: 'Co-founder, Managing Partner' },
    { name: 'Александр Иванов', role: 'Co-founder, Managing Partner' },
  ],
}

export const FINAL_CTA = {
  number: '8.0',
  label: 'Готовы двигаться дальше?',
  title: 'Запишитесь на 30-минутную консультацию с инвестиционным советником Axevil.',
  subtitle: 'Zoom-встреча, на которой наш инвестиционный аналитик ответит на все ваши вопросы.',
  primary: 'Записаться на консультацию',
  secondary: 'Получить доступ',
  calendly: 'https://calendly.com/axevil/consultation',
  crossPrefix: 'Сначала хотите понять процесс детальнее? →',
  crossLink: 'Как работает Axevil',
  crossHref: 'how_it_works.html',
}

// ── KeyStats regulatory pills (RIKeyStats port) ──
export const KEYSTATS_PILLS = ['SEC Exempt Reporting Adviser', 'FINRA Member', 'Delaware SPV']

// ── Thesis card images (RIInsight port) — paired by index with THESIS.rows ──
export const THESIS_IMAGES = [
  '/img/is/investor-image-01.webp',
  '/img/is/investor-image-02.webp',
  '/img/is/investor-image-03.webp',
]

// ── Portfolio companies (RIPortfolio port): logo + status + sector + body ──
export interface PortfolioCompany { logo: string; status: 'open' | 'closed' | 'soon'; statusLabel: string; category: string; body: string }
export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  { logo: '/img/is/logos/logo-spacex.svg',     status: 'open',   statusLabel: 'Открыта',  category: 'Deeptech · космос',   body: 'Мировой лидер запусков и спутниковой инфраструктуры. Оценка $527 млрд до IPO.' },
  { logo: '/img/is/logos/logo-antrophic.svg',  status: 'closed', statusLabel: 'Закрыта',  category: 'AI / LLM · Pre-IPO',  body: 'Frontier-лаборатория AI, создающая надёжные и интерпретируемые системы.' },
  { logo: '/img/is/logos/logo-xai.svg',        status: 'soon',   statusLabel: 'Скоро',    category: 'AI · Infrastructure', body: 'Лаборатория frontier-моделей: Grok и вычислительный кластер Colossus.' },
  { logo: '/img/is/logos/logo-cursor.svg',     status: 'open',   statusLabel: 'Открыта',  category: 'Developer tools',     body: 'AI-нативный редактор кода, которым пользуются ведущие инженерные команды.' },
  { logo: '/img/is/logos/logo-databricks.svg', status: 'soon',   statusLabel: 'Скоро',    category: 'Data / AI · Pre-IPO', body: 'Платформа данных и AI для 10 000+ корпоративных клиентов по всему миру.' },
  { logo: '/img/is/logos/logo-stripe.svg',     status: 'closed', statusLabel: 'Закрыта',  category: 'Финтех · Pre-IPO',    body: 'Платёжная инфраструктура для интернета. $1,4 трлн обработано в 2025 году.' },
]
export const PORTFOLIO_CTA = 'Смотреть все 35 компаний портфеля'

// ── Legal IllCards (AUOperate port): 4 regulatory pillars ──
export interface LegalCard { num: string; img: string; imgMobile: string; title: string; body: string }
export const LEGAL_CARDS: LegalCard[] = [
  { num: '1.0', img: '/img/ill/ill-legal-03.png', imgMobile: '/img/ill/ill-legal-03-mobile.png', title: 'Регулируется SEC',
    body: 'Axevil Capital — Exempt Reporting Adviser, зарегистрированный в SEC (#802-126907) и отчитывающийся перед FINRA (CRD #323970). Только Reg D 506(b).' },
  { num: '2.0', img: '/img/ill/ill-legal-01.png', imgMobile: '/img/ill/ill-legal-01-mobile.png', title: 'SPV под каждую сделку',
    body: 'Каждая инвестиция изолирована в отдельной US SPV (Alextar VC LLC) — отделена от других сделок и от управляющей компании.' },
  { num: '3.0', img: '/img/ill/ill-legal-04.png', imgMobile: '/img/ill/ill-legal-04-mobile.png', title: 'Двойная верификация',
    body: 'Каждая сделка проходит два независимых контура: инвестиционный кейс (фундамент, траектория IPO) и транзакция (документы, механика передачи, продавец).' },
  { num: '4.0', img: '/img/ill/ill-legal-02.png', imgMobile: '/img/ill/ill-legal-02-mobile.png', title: 'Юрисдикция Delaware',
    body: 'Фонд и управляющая компания — структуры Delaware, стандартной юрисдикции для институциональных венчурных vehicle.' },
]

export const FOOTER_COMPLIANCE =
  'Axevil Capital — SEC Exempt Reporting Adviser, CRD #802-126907, FINRA Member, CRD #323970. Reg D 506(b). © 2026 Axevil Capital. Все права защищены.'
