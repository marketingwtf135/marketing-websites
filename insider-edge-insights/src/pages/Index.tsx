import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lang, content } from "@/lib/content";
import { setManualOverride, getManualOverride, detectAutoLang } from "@/lib/lang";
import HeroSection from "@/components/landing/HeroSection";
import AuthoritySection from "@/components/landing/AuthoritySection";
import ValueSection from "@/components/landing/ValueSection";
import AuthorsSection from "@/components/landing/AuthorsSection";
import FinalCTA from "@/components/landing/FinalCTA";
import FadeQuoteSection from "@/components/landing/FadeQuoteSection";
import AxevilSection from "@/components/landing/AxevilSection";
import logo from "@/assets/logo.png";
import logo2 from "@/assets/logo-2.png";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang: Lang = location.pathname === "/en" ? "en" : "ru";
  const otherLang = lang === "ru" ? "en" : "ru";
  const [showSticky, setShowSticky] = useState(false);
  const t = content[lang].nav;

  // Redirect to correct language if no manual override and URL lang mismatches browser
  useEffect(() => {
    const manual = getManualOverride();
    if (!manual) {
      const autoLang = detectAutoLang();
      if (autoLang !== lang) {
        navigate(`/${autoLang}${location.search}${location.hash}`, { replace: true });
      }
    }
  }, []); // run once on mount

  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("request-access")?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLang = () => {
    setManualOverride(otherLang);
    navigate(`/${otherLang}${window.location.search}${window.location.hash}`);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] overflow-x-hidden">
      <nav
        className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between border-b border-white/[0.04]"
        style={{ background: "rgba(11, 11, 11, 0.9)", backdropFilter: "blur(12px)" }}
      >
        <img src={logo} alt="Axevil Capital" className="h-5" />
        <div className="flex items-center gap-4">
          <button
            onClick={switchLang}
            className="text-xs text-white/50 hover:text-white transition-colors font-mono-data tracking-wider"
          >
            {t.lang}
          </button>
          <button
            onClick={scrollToForm}
            className="text-xs text-black px-5 py-2.5 rounded-lg font-semibold hover:brightness-110 transition-all bg-[#eaf165]"
          >
            {t.cta}
          </button>
        </div>
      </nav>

      <HeroSection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <AuthorsSection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <AuthoritySection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <ValueSection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <FadeQuoteSection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <AxevilSection lang={lang} />

      <div className="max-w-5xl mx-auto h-px bg-white/[0.04]" />
      <FinalCTA lang={lang} />

      {showSticky && (
        <div
          className="fixed bottom-0 inset-x-0 z-50 p-3 border-t border-white/[0.06] lg:hidden"
          style={{ background: "rgba(11, 11, 11, 0.95)", backdropFilter: "blur(12px)" }}
        >
          <button
            onClick={scrollToForm}
            className="w-full h-11 bg-accent text-black text-sm font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            {t.cta}
          </button>
        </div>
      )}

      <footer className="px-4 sm:px-10 lg:px-16 py-8 border-t border-white/[0.04] bg-[#0B0B0B]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logo2} alt="Axevil Capital" className="h-6" />
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-all">
              {lang === "ru" ? "Конфиденциальность" : "Privacy"}
            </a>
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-all">
              {lang === "ru" ? "Условия" : "Terms"}
            </a>
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-all">
              {lang === "ru" ? "Контакты" : "Contacts"}
            </a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-5 pt-5 border-t border-white/[0.04]">
          <p className="text-xs text-white/15 text-center font-mono-data tracking-wide">
            © 2026 Axevil Capital. {lang === "ru" ? "Все права защищены." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
