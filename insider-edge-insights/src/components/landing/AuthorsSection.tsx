import { useState } from "react";
import { User } from "lucide-react";
import { content, Lang } from "@/lib/content";
import photoIvanov from "@/assets/author-ivanov.jpg";
import photoChumachenko from "@/assets/author-chumachenko.jpg";
import photoSolovev from "@/assets/author-solovev.jpg";
import photoRevenko from "@/assets/author-revenko.jpg";

const photos = [photoIvanov, photoChumachenko, photoSolovev, photoRevenko];

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

export default function AuthorsSection({ lang }: { lang: Lang }) {
  const t = content[lang].authors;
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-10 lg:px-16 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-16">
          <span className="inline-block font-sans text-[10px] tracking-[0.3em] px-5 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
            <User className="w-3 h-3 text-[#EAF167] inline mr-2 -mt-0.5" />
            <span className="text-white/50 font-medium">{t.tag}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {t.people.map((person, i) => {
            const showFallback = failedImages[i];

            return (
              <div
                key={person.name}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] md:min-h-[400px] md:aspect-auto bg-[#111111]"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer-card" />
                {!showFallback ? (
                  <img
                    src={photos[i]}
                    alt={person.name}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    onError={() =>
                      setFailedImages((current) => ({ ...current, [i]: true }))
                    }
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/85 tracking-[0.08em]">
                      {getInitials(person.name)}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                  <h3 className="text-base sm:text-xl md:text-2xl font-normal tracking-[-0.06em] text-white leading-[0.75]">
                    {person.name}
                  </h3>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#EAF167] mt-0.5">
                    {person.role}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/60 mt-1 sm:mt-1.5 leading-relaxed hidden md:block">
                    {person.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
