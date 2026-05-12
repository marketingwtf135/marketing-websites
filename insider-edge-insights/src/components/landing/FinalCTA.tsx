import { Check } from "lucide-react";
import { content, Lang } from "@/lib/content";
import { useLeadForm } from "@/hooks/useLeadForm";
import FormModal from "./FormModal";
import PhoneInput from "./PhoneInput";
import reportSpread from "@/assets/report-spread.png";

export default function FinalCTA({ lang }: { lang: Lang }) {
  const t = content[lang].final;
  const { form, errors, status, modalType, setField, handleSubmit, closeModal } = useLeadForm(lang);

  const isPending = status === "pending";
  const inputBase = "w-full h-12 px-4 text-white placeholder:text-white/30 outline-none bg-[#0B0B0B] border rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const inputOk = "border-white/10 focus:border-[#EAF167]/50";
  const inputErr = "border-red-500/60 focus:border-red-500/80";

  return (
    <section id="request-access" className="relative px-4 sm:px-10 lg:px-16 py-24 lg:py-32 bg-[#0B0B0B] overflow-hidden">
      <img
        src={reportSpread}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[580px] lg:w-[720px] opacity-20 pointer-events-none select-none rotate-[-6deg]"
      />
      <div className="relative z-10 max-w-lg mx-auto text-center bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.06em] text-white mb-10">
          {t.h2}
        </h2>

        <ul className="space-y-3 mb-10 inline-block text-left">
          {t.bullets.map((bullet, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white/75">
              <div className="w-5 h-5 rounded-full bg-[#EAF167]/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#EAF167]" />
              </div>
              {bullet}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3" noValidate>
          <div>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder={t.namePlaceholder}
              required
              disabled={isPending}
              autoComplete="name"
              enterKeyHint="next"
              className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "final-name-err" : undefined}
            />
            {errors.name && <p id="final-name-err" className="text-red-400 text-xs mt-1.5 ml-1 text-left">{errors.name}</p>}
          </div>

          <div>
            <PhoneInput
              value={form.phone}
              onChange={(v) => setField("phone", v)}
              placeholder={t.phonePlaceholder}
              disabled={isPending}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "final-phone-err" : "final-phone-hint"}
            />
            {errors.phone
              ? <p id="final-phone-err" className="text-red-400 text-xs mt-1.5 ml-1 text-left">{errors.phone}</p>
              : <p id="final-phone-hint" className="text-white/40 text-xs mt-1.5 ml-1 text-left">{lang === "ru" ? "Отчёт пришлём в WhatsApp — укажите номер, привязанный к WhatsApp" : "We'll send the report via WhatsApp — enter a WhatsApp-linked number"}</p>}
          </div>

          <div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              placeholder={t.emailPlaceholder}
              disabled={isPending}
              autoComplete="email"
              enterKeyHint="next"
              inputMode="email"
              className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "final-email-err" : undefined}
            />
            {errors.email && <p id="final-email-err" className="text-red-400 text-xs mt-1.5 ml-1 text-left">{errors.email}</p>}
          </div>


          <button
            type="submit"
            disabled={isPending}
            className="relative w-full h-14 px-12 bg-[#EAF167] text-black font-semibold text-sm rounded-lg hover:brightness-110 transition-all overflow-hidden disabled:opacity-70"
          >
            <span className="relative z-10">
              {isPending
                ? (lang === "ru" ? "Отправляем..." : "Submitting...")
                : t.cta}
            </span>
            {!isPending && (
              <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            )}
          </button>
        </form>
      </div>

      {modalType && <FormModal type={modalType} lang={lang} onClose={closeModal} />}
    </section>
  );
}
