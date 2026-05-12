import { content, Lang } from "@/lib/content";

const bulletItems = {
  ru: [
    "Комбинация отраслевых исследований с внутренней аналитикой платформы",
    "Анализ сделок на вторичном рынке и данных закрытых раундов",
    "Проприетарные модели оценки стоимости pre-IPO активов",
    "Экспертиза команды с опытом в Societe Generale, Атон, Финам и Angel Squad",
  ],
  en: [
    "Combination of industry research with proprietary platform analytics",
    "Secondary market transaction data and closed round analysis",
    "Proprietary valuation models for pre-IPO assets",
    "Team expertise from Societe Generale, Aton, Finam, and Angel Squad",
  ],
};

export default function AuthoritySection({ lang }: { lang: Lang }) {
  const t = content[lang].authority;
  const bullets = bulletItems[lang];

  return (
    <section className="px-4 sm:px-10 lg:px-16 py-24 lg:py-32 bg-[#0B0B0B]">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-5">
          <span className="font-medium text-[10px] tracking-[0.3em] text-white/40 bg-white/[0.06] backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          {t.tag}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.06em] text-white mb-8 text-center">
          {lang === "ru" ? "Методология исследования" : "Research Methodology"}
        </h2>

        <div>
          {bullets.map((item, i) => (
            <div
              key={item}
              className={`flex items-start gap-4 py-4 ${i < bullets.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span className="text-[#EAF167] shrink-0 text-lg leading-relaxed">{i + 1}/</span>
              <span className="text-gray-300 text-base md:text-lg leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
