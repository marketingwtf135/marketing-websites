# Планы на завтра — ds-agent + публикация дизайн-системы

_Зафиксировано 2026-05-30. Контекст: страница `axevil-about` собрана из портированных
DS-блоков; создан dev-инструмент **ds-agent**; токены ДС отрефакторены
(`text-text-*` → `text-*`, `paragraph` line-height 145%); DS `Nav` параметризован._

---

## ЧАСТЬ 1 — Как выгрузить обновления дизайн-системы (СНАЧАЛА, иначе разъедется)

Сейчас правки ДС применены **локально** (в node_modules проектов), но НЕ опубликованы.
Незакоммиченного нет, но удалённый репозиторий ДС не обновлён.

### Что уже изменено в источнике (главный репо `Axevil-New-Website`, ветка-worktree dazzling-wing-c0fe6d):
- `packages/tokens/tailwind.config.base.js` — ключи fontSize без префикса `text-` + `paragraph` LH 1.45.
- `design-system/src/components/Nav.tsx` — новые пропсы `links` / `logoHref` / `ctaLabel` / `onCtaClick` (дефолты = меню главного сайта).
- весь `src/**` и `design-system/src/**` — миграция `text-text-*` → `text-*` (217 вхождений, 61 файл).
- Коммиты в worktree: `a3b723c` (токены), `5f8d232` (Nav).

### Блокеры публикации (ВАЖНО — нужны действия пользователя):
1. **`gh` не авторизован** + нет git-credentials → push наружу невозможен из агента.
   → `gh auth login` (или настроить PAT для `marketingwtf135`).
2. **DS-репо `axevil-design-system` ветка `master`: ahead 1, behind 1** относительно
   origin. Прямой push отклонится (non-fast-forward). Нужен `git pull`/merge с
   разрешением возможного конфликта.
3. Канонический путь публикации — **не ручной push в DS-репо**, а workflow
   `.github/workflows/sync-design-system.yml` в главном репо: он сам собирает пакет
   и пушит в `axevil-design-system` при пуше изменений токенов/компонентов.

### Шаги публикации (по порядку):
```
# 0. авторизация (один раз)
gh auth login                       # аккаунт marketingwtf135

# 1. главный репозиторий — запушить источник правок (это триггерит sync-workflow)
cd "Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d"
git push origin <branch>:master     # как принято в проекте (master И main)

# 2. дождаться GitHub Action sync-design-system → он обновит axevil-design-system
#    (если workflow отключён — синхронизировать вручную, см. ниже)

# 3. в каждом проекте-потребителе обновить пакет
cd marketing-websites/axevil-about && npm i      # подтянет новый @axevil/design-system
cd ../axevil-newsletter && npm i
cd ../axevil-pdf-page && npm i
cd ../axevil-webinar && npm i
# insider-edge-insights — токены text-text-* не использует, можно позже

# 4. прогнать билды-проверки
npm run build    # в каждом проекте, где обновляли
```

### Ручная синхронизация DS-репо (если workflow недоступен):
```
cd "Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d"
npm run build:ds                         # собирает .ds-build/
# скопировать .ds-build/* в локальный клон axevil-design-system, затем:
cd ../../../../axevil-design-system
git pull --rebase origin master          # СНАЧАЛА разрулить ahead/behind
# скопировать dist/, index.js, index.d.ts, tailwind.config.base.js, tokens.css
git add -A && git commit -m "build: text-token rename + paragraph LH 145% + Nav props"
git push origin master
```

### Проверка после публикации:
- [ ] `grep -r "text-text-"` по всем проектам → 0 совпадений.
- [ ] `.text-paragraph` в собранном CSS = `line-height:1.45`.
- [ ] DS `Nav` принимает `links/logoHref/ctaLabel/onCtaClick` в опубликованном `dist/index.d.ts`.
- [ ] главный сайт (`/`, `/retail-investors`, `/wealth-managers`, `/company-stock`) рендерится без регрессий (Nav дефолты не тронуты).

---

## ЧАСТЬ 2 — Как масштабировать ds-agent

Файл: `axevil-about/src/dev/DsAgent.tsx` (dev-only, монтируется за `import.meta.env.DEV`).
Сейчас умеет: hover-инспекция токенов, имя DS-компонента + бредкрамб + file:line,
папки Blocks/Elements/Cards/Icons, поиск, live-preview, дропдауны вариантов,
icon-picker с поиском, комментарии, очередь правок с метками Desktop/Tablet/Mobile,
copy-all / delete-all. Стиль — токены AXEVIL, зелёный акцент.

### Приоритет 1 — надёжность ядра
- [ ] **Полные схемы вариантов** для оставшихся DS-компонентов (CtaForm, Form, FAQ,
      SliderCard, DescTag, NavDropdown, PageEntry) — сейчас заданы только для 6.
- [ ] **Авто-схема из типов**: генерить VARIANT_SCHEMA из `dist/index.d.ts` пакета
      (парсить union-типы пропсов), чтобы не держать список вручную.
- [ ] **Персистентность очереди**: хранить edits в `localStorage` (по pathname),
      чтобы reload не терял правки — как делает agentation (`saveAnnotations`).
- [ ] Хоткеи: `Alt+D` тоггл, `Esc` снять выделение, `Enter` = Add в композере.

### Приоритет 2 — переносимость (сделать общим dev-tool, а не только axevil-about)
- [ ] **Вынести ds-agent в пакет ДС** как dev-export: `@axevil/design-system/ds-agent`,
      чтобы подключался во всех проектах одной строкой. Каталог компонентов/иконок
      брать из самого пакета (а не хардкодить списки).
- [ ] Источник иконок — из `assets-manifest.json` пакета (динамически), не статичный массив.
- [ ] Каталог папок (Blocks/Elements/Cards/Icons) описать декларативно в пакете, чтобы
      синхронно рос вместе с ДС.

### Приоритет 3 — UX / фичи
- [ ] **Live-edit вариантов на самом элементе** (эфемерно, через React DevTools-style
      перемонтирование) — «примерить» вариант до Save. Помечать как непостоянное.
- [ ] **Множественный выбор** элементов (как multi-select в agentation) → групповая правка.
- [ ] **Скриншот выделенного** прикреплять к правке (html2canvas) для контекста в чат.
- [ ] Бейдж/панель списка правок: открыть, редактировать/удалять отдельные пункты,
      менять их viewport-метку вручную.
- [ ] Превью на разных брейкпоинтах (Desktop/Tablet/Mobile тоггл внутри preview-бокса).
- [ ] Тёмная/светлая тема панели (сейчас только тёмная).

### Приоритет 4 — интеграция с рабочим процессом
- [ ] Формат вывода Copy сделать строго машиночитаемым (JSON-блок) — чтобы я применял
      правки детерминированно: `[{file, line, action, component, props, note, viewport}]`.
- [ ] Кнопка «Apply via Claude»: класть инструкции не только в буфер, но и в формате,
      который подхватывает agentation endpoint (если настроим webhook).
- [ ] Связать с Figma Code Connect: показывать рядом с DS-компонентом ссылку на его
      Figma-ноду (через `get_code_connect_map`).

### Идея «личного скилла»
- [ ] Оформить как полноценный personal dev-skill `ds-agent`: README + версия + changelog,
      единый конфиг (какие компоненты/папки/иконки), чтобы переиспользовать на всех
      страницах AXEVIL и в будущих проектах.

---

## Открытые мелочи по странице axevil-about
- [ ] Фото в карточки тезиса (#2 фидбэка) — ждём реальные изображения от пользователя.
- [ ] Фото основателей в блоке «Письмо от основателей» — плейсхолдеры, ждём ассеты.
- [ ] Адаптив 360 финально не отснят (Playwright отключали) — проверить при ревью.
- [ ] Решить деплой `/about`: сейчас `base:'/'`; для физического `/about/` нужен прокси
      или вернуть base (но тогда DS-компоненты с корневыми путями требуют локальных версий).

---

## ЧАСТЬ 2-bis — ds-agent: прогресс и новые пункты (обновлено 2026-05-30)

### ✅ Уже сделано
- Hover-инспекция токенов (type/color/radius/spacing) + имя DS-компонента + бредкрамб + file:line.
- Папки Blocks/Elements/Cards/Icons, поиск, live-preview, дропдауны вариантов, icon-picker с поиском.
- Комментарии (composer с разворачиваемыми характеристиками), очередь правок с метками Desktop/Tablet/Mobile.
- **Персист очереди в localStorage** (по pathname) — reload не теряет правки.
- **Хоткеи**: `` ` `` или Alt+D — вкл/выкл; Esc — снять выделение; ⌘/Ctrl+Enter — Add в композере.
- **Copy** кладёт человекочитаемый список + машиночитаемый JSON-блок (`action/file/component/target/props/note/viewport`).
- **UI в стиле ДС** (Inter Tight, токены цвета/радиуса/спейсинга, кнопки в духе BtnOwn), зелёный акцент; иконки из agentation (copy/trash).
- **Панель не уходит за края экрана**: измеряем высоту панели (ref), позиционируем под элементом, флипаем вверх если не влезает вниз, финально клампим top/left в пределах вьюпорта.

### ⏭️ Осталось по приоритетам
**P1 — надёжность**
- [ ] Схемы вариантов для оставшихся DS-компонентов (CtaForm, Form, FAQ, SliderCard, DescTag, NavDropdown, PageEntry).
- [ ] Авто-генерация VARIANT_SCHEMA из `dist/index.d.ts` пакета (парсить union-типы пропсов), чтобы не вести список руками.
- [ ] Репозиционировать панель на scroll/resize (сейчас пересчёт на ховер/рендер; добавить слушатели + reflow при прокрутке выбранного).

**P2 — переносимость**
- [ ] Вынести ds-agent в dev-export пакета: `@axevil/design-system/ds-agent`, подключение одной строкой во всех проектах.
- [ ] Каталог компонентов/папок/иконок брать из пакета (`assets-manifest.json` + барรель экспортов), а не хардкодить массивы.

**P3 — UX**
- [x] **Просмотр + удаление отдельных пунктов очереди** (попап «Queue» по ☰). Осталось: инлайн-edit текста + ручная смена viewport-метки.
- [x] **Панель в пределах экрана + следует за элементом** на scroll/resize.
- [ ] Тоггл превью на брейкпоинтах (Desktop/Tablet/Mobile) внутри preview-бокса.
- [ ] Мультивыбор элементов → групповая правка.
- [ ] Эфемерный live-edit варианта на самом элементе (примерить до Save), помечать как непостоянное.
- [ ] Скриншот выделения (html2canvas) в правку для контекста.

**P4 — интеграция**
- [ ] Кнопка «Apply via Claude»: слать JSON в endpoint/webhook (если настроим), а не только буфер.
- [ ] Связь с Figma Code Connect: ссылка на Figma-ноду рядом с DS-компонентом.

**Личный скилл**
- [ ] Оформить ds-agent как версионируемый personal dev-skill: README + changelog + единый конфиг (компоненты/папки/иконки) для переиспользования на всех страницах AXEVIL.
