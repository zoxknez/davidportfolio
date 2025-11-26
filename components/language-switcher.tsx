"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "sr", name: "Srpski", flag: "🇷🇸" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
] as const;

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (code: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "text-white/70 hover:text-white hover:bg-white/10",
          isOpen && "bg-white/10 text-white",
          isPending && "opacity-50 cursor-wait"
        )}
        aria-label="Change language"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{currentLanguage?.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/50 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  disabled={isPending}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 text-sm transition-colors",
                    locale === lang.code
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                    isPending && "opacity-50 cursor-wait"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {locale === lang.code && (
                    <Check className="h-4 w-4 text-green-400" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
