import { Check, X, AlertCircle } from "lucide-react";
import { Lang } from "@/lib/content";

interface FormModalProps {
  type: "success" | "error";
  lang: Lang;
  onClose: () => void;
}

export default function FormModal({ type, lang, onClose }: FormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-10 max-w-md w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {type === "success" ? (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white text-xl font-medium mb-2">
              {lang === "ru" ? "Отчёт придёт в WhatsApp в течение минуты" : "The report will arrive on WhatsApp within a minute"}
            </h3>
            <p className="text-white/60 text-sm mb-6">
              {lang === "ru"
                ? "Откройте WhatsApp на указанном номере — файл уже летит к вам"
                : "Open WhatsApp on the number you provided — the file is on its way"}
            </p>
            <button
              onClick={onClose}
              className="px-8 h-11 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors"
            >
              {lang === "ru" ? "Закрыть" : "Close"}
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-white text-xl font-medium mb-2">
              {lang === "ru" ? "Ошибка" : "Error"}
            </h3>
            <p className="text-white/60 text-sm mb-6">
              {lang === "ru" ? "Произошла ошибка. Попробуйте снова." : "Something went wrong. Please try again."}
            </p>
            <button
              onClick={onClose}
              className="px-8 h-11 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
            >
              {lang === "ru" ? "Попробовать снова" : "Try again"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
