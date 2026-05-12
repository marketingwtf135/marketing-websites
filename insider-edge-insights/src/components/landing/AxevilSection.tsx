import { Lang } from "@/lib/content";
import axevil3d from "@/assets/axevil-3d.png";
import iconDollar from "@/assets/icon-dollar.png";
import iconGrowth from "@/assets/icon-growth.png";
import iconBriefcase from "@/assets/icon-briefcase.png";

const data = {
  ru: {
    cards: [
      {
        icon: iconDollar,
        title: "$150M+\nAUM",
        desc: "И растущий портфель\nprivate tech сделок",
        large: true,
      },
      {
        icon: iconGrowth,
        title: "Доступ\nк late-stage\nи pre-IPO возможностям",
        desc: "",
        large: false,
      },
      {
        icon: iconBriefcase,
        title: "Аналитика,\nструктура сделок\nи управление\nпортфелем\nв одном месте",
        desc: "",
        large: false,
      },
    ],
  },
  en: {
    cards: [
      {
        icon: iconDollar,
        title: "$150M+\nAUM",
        desc: "Across private\ntech investments",
        large: true,
      },
      {
        icon: iconGrowth,
        title: "Access to late-stage\nand pre-IPO",
        desc: "opportunities",
        large: false,
      },
      {
        icon: iconBriefcase,
        title: "Analytics, deal\nstructuring, and\nportfolio management",
        desc: "in one place",
        large: false,
      },
    ],
  },
};

const fontStyle = { fontFamily: "Inter, sans-serif", letterSpacing: "-0.04em" };
const headingStyle = { fontFamily: "Inter, sans-serif", letterSpacing: "-1px" };

export default function AxevilSection({ lang }: { lang: Lang }) {
  const t = data[lang];

  return (
    <section className="px-4 sm:px-10 lg:px-16 py-24 lg:py-32 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center text-4xl sm:text-5xl lg:text-[3.5rem] text-white mb-16 font-normal"
          style={headingStyle}
        >
          Axevil Capital
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.85fr] gap-5 items-stretch">
          {t.cards.map((card, i) => (
            <div key={i} className="relative pt-5 z-10">
              {/* Icon circle overlapping card */}
              <div className="absolute -top-0 left-4 z-10">
                <img
                  src={card.icon}
                  alt=""
                  className="w-11 h-11 object-contain"
                />
              </div>
              {/* Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-7 min-h-[220px] flex flex-col justify-end">
                <h3
                  className={`text-white font-normal leading-[1.1] whitespace-pre-line ${
                    card.large
                      ? "text-[2.2rem] sm:text-[2.6rem]"
                      : "text-lg sm:text-xl"
                  }`}
                  style={fontStyle}
                >
                  {card.title}
                </h3>
                <p
                  className="text-white/40 text-sm mt-3 whitespace-pre-line leading-snug"
                  style={fontStyle}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}

          {/* 3D illustration */}
          <div className="hidden lg:flex items-end justify-end relative -ml-8 z-0">
            <img
              src={axevil3d}
              alt="Axevil Platform"
              className="w-full max-w-[380px] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
