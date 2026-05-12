import { useEffect, useRef, useState, useCallback } from "react";
import { Lang } from "@/lib/content";

const text = {
  ru: "Мы находимся в начале нового цикла экономического роста. В отчёте — ключевые события частного рынка 2025 года и наш прогноз движения капитала на 2026.",
  en: "We are at the beginning of a new economic growth cycle. The report covers key private market events of 2025 and our forecast for capital flows in 2026.",
};

export default function FadeQuoteSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const start = window.innerHeight * 0.8;
    const end = -rect.height * 0.2;
    const p = (start - rect.top) / (start - end);
    setProgress(Math.min(1, Math.max(0, p)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const words = text[lang].split(" ");
  const totalWords = words.length;
  const dashIndex = words.findIndex((w) => w === "—");

  return (
    <section ref={sectionRef} className="px-4 sm:px-10 lg:px-16 py-24 min-h-[50vh] md:min-h-[80vh] flex items-center bg-[#0B0B0B]">
      <div className="max-w-5xl mx-auto">
        <p className="text-2xl md:text-3xl lg:text-5xl font-normal leading-tight lg:leading-[1.15] tracking-[-0.06em]">
          {words.map((word, i) => {
            const wordThreshold = (i + 1) / totalWords;
            const isActive = progress >= wordThreshold;
            const isAfterDash = dashIndex !== -1 && i > dashIndex;
            return (
              <span
                key={i}
                className="inline-block mr-[0.3em]"
                style={{
                  color: isActive
                    ? isAfterDash ? "#EAF167" : "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.2)",
                  transition: "color 0.3s",
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
