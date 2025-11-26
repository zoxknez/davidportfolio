"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { TrainingDropdown } from "@/components/training-dropdown";
import { TypingEffect } from "@/components/typing-effect";
import { heroContent } from "@/data/home-content";
import { useMounted } from "@/hooks/use-mounted";
import { buttonStyles } from "@/lib/styles";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Hero() {
  const mounted = useMounted();
  const t = useTranslations();

  if (!mounted) return null;

  return (
    <section className="flex flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center gap-6">
        {/* Floating badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-white/80 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-white/90">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.5), 0 4px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
            letterSpacing: "-0.03em",
          }}
        >
          David Knežević
        </motion.h1>
        
        <motion.div 
          className="h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        
        {/* Dynamic typing effect */}
        <motion.div 
          className="min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="max-w-2xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white/90 tracking-wide" style={{ 
            textShadow: "0 2px 15px rgba(0, 0, 0, 0.5)",
            letterSpacing: "0.01em",
          }}>
            <TypingEffect phrases={heroContent.dynamicPhrases} typingSpeed={80} deletingSpeed={40} pauseDuration={2000} />
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="max-w-xl text-sm sm:text-base text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      {/* CTA Buttons - Primary action highlighted */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button 
          variant="ghost" 
          className="group relative w-full sm:w-auto h-12 px-8 rounded-full border-2 border-white/30 bg-white/20 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
          asChild
        >
          <Link href="/quiz" className="flex items-center gap-2">
            {t("hero.cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`${buttonStyles.primary} w-full sm:w-auto h-12`}
          asChild
        >
          <Link href="/programs">{t("hero.secondaryCta")}</Link>
        </Button>
      </motion.div>

      {/* Navigation Links */}
      <motion.div 
        className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <TrainingDropdown />
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/media">{t("common.media")}</Link>
        </Button>
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/news">{t("common.news")}</Link>
        </Button>
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/contact">{t("common.contact")}</Link>
        </Button>
      </motion.div>
    </section>
  );
}


