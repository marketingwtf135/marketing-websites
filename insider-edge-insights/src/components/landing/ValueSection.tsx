import { content, Lang } from "@/lib/content";
import reportMockup from "@/assets/report-mockup.png";

export default function ValueSection({ lang }: { lang: Lang }) {
  const t = content[lang].value;

  return (
    <section className="px-4 sm:px-10 lg:px-16 py-24 lg:py-32 bg-[#0B0B0B]">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex mx-auto w-full justify-center mb-5">
          <span className="font-medium text-[10px] tracking-[0.3em] text-white/40 bg-white/[0.06] backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            {t.tag}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.06em] text-white text-center mb-16">
          {t.h2}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — report mockup */}
          <div className="flex justify-center">
            <img
              src={reportMockup}
              alt="Report preview"
              className="w-full max-w-[620px] object-contain scale-110 lg:scale-125"
              loading="lazy"
            />
          </div>

          {/* Right — vertical timeline */}
          <div className="relative flex flex-col gap-0">
            {t.cards.map((card, i) => (
              <div key={card.num} className="relative flex items-start gap-5 pb-10 last:pb-0">
                {/* Vertical line */}
                {i < t.cards.length - 1 && (
                  <div className="absolute left-[22px] top-[44px] bottom-0 w-px bg-white/10" />
                )}
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-[44px] h-[44px] rounded-full bg-[#EAF167] flex items-center justify-center">
                  <span className="text-black text-sm font-medium">{i + 1}/</span>
                </div>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-xl text-white leading-tight font-medium">{card.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                    <span className="text-[#EAF167]">→</span>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
