import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { content, Lang } from "@/lib/content";
import { useLeadForm } from "@/hooks/useLeadForm";
import FormModal from "./FormModal";
import PhoneInput from "./PhoneInput";
import reportCover from "@/assets/report-cover.png";
import { useState } from "react";

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = content[lang].hero;
  const tf = content[lang].final;
  const { form, errors, status, modalType, setField, handleSubmit, closeModal } = useLeadForm(lang);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 12);
    setRotateX(-y * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isPending = status === "pending";
  const inputBase = "w-full h-12 px-4 rounded-lg text-sm text-white placeholder:text-white/35 outline-none border bg-[#0B0B0B] transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const inputOk = "border-white/10 focus:border-[#EAF167]/50";
  const inputErr = "border-red-500/60 focus:border-red-500/80";

  return (
    <section className="relative px-4 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-24 lg:pb-32 bg-[#0B0B0B]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
              <FileText className="w-4 h-4 text-[#EAF167]" />
              <span className="font-sans font-medium text-[11px] tracking-[0.25em] text-white/60">
                {t.label}
              </span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.4rem] lg:text-[2.8rem] xl:text-[3.2rem] font-normal leading-[1.12] tracking-[-0.06em] text-white">
              {lang === "ru" ? (
                <><span className="text-[#FFFF73]">Ключевые события</span><br />частного рынка 2025<br />и прогноз 2026</>
              ) : (
                <><span className="text-[#FFFF73]">Key events</span><br />of the private market 2025<br />and 2026 forecast</>
              )}
            </h1>

            <div
              className="hidden md:block max-w-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: "800px" }}
            >
              <motion.img
                src={reportCover}
                alt="Pre-IPO Insider 2026 Report"
                className="rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, rotateX, rotateY }}
                transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 0.8, delay: 0.3 }, rotateX: { duration: 0.2 }, rotateY: { duration: 0.2 } }}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#111111] border border-white/10 p-5 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-lg bg-[#EAF167]/10 flex items-center justify-center aspect-square">
                  <Download className="w-6 h-6 text-[#EAF167]" />
                </div>
                <h3 className="text-white text-2xl font-normal tracking-[-0.06em] leading-[1.1]">
                  {lang === "ru" ? "Скачать отчёт бесплатно" : "Download report for free"}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder={tf.namePlaceholder}
                    required
                    disabled={isPending}
                    autoComplete="name"
                    enterKeyHint="next"
                    className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "hero-name-err" : undefined}
                  />
                  {errors.name && <p id="hero-name-err" className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>}
                </div>

                <div>
                  <PhoneInput
                    value={form.phone}
                    onChange={(v) => setField("phone", v)}
                    placeholder={tf.phonePlaceholder}
                    disabled={isPending}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "hero-phone-err" : "hero-phone-hint"}
                  />
                  {errors.phone
                    ? <p id="hero-phone-err" className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>
                    : <p id="hero-phone-hint" className="text-white/40 text-xs mt-1.5 ml-1">{lang === "ru" ? "Отчёт пришлём в WhatsApp — укажите номер, привязанный к WhatsApp" : "We'll send the report via WhatsApp — enter a WhatsApp-linked number"}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder={tf.emailPlaceholder}
                    disabled={isPending}
                    autoComplete="email"
                    enterKeyHint="next"
                    inputMode="email"
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "hero-email-err" : undefined}
                  />
                  {errors.email && <p id="hero-email-err" className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
                </div>


                <button
                  type="submit"
                  disabled={isPending}
                  className="relative w-full h-14 rounded-lg bg-[#EAF167] text-black text-sm font-semibold hover:brightness-110 transition-all overflow-hidden disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {isPending
                      ? (lang === "ru" ? "Отправляем..." : "Submitting...")
                      : (lang === "ru" ? "Получить отчёт" : "Get the report")}
                  </span>
                  {!isPending && (
                    <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {modalType && <FormModal type={modalType} lang={lang} onClose={closeModal} />}
    </section>
  );
}
