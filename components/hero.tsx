"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { TypingEffect } from "@/components/typing-effect";
import { heroContent } from "@/data/home-content";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  MapPin,
  Timer,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

export function Hero() {
  const t = useTranslations();

  const trainingSignals = [
    { label: "Method", value: "Progressive overload", icon: Dumbbell },
    { label: "Base", value: "Dubai / Online", icon: MapPin },
    { label: "Cadence", value: "Weekly adaptation", icon: Timer },
  ];

  const scoreLines = [
    { label: "Strength", value: "92%", width: "92%" },
    { label: "Discipline", value: "98%", width: "98%" },
    { label: "Recovery", value: "86%", width: "86%" },
  ];

  return (
    <section className="relative grid w-full max-w-7xl items-center gap-10 py-6 sm:py-8 lg:min-h-[calc(78svh-6rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)]">
      <div className="flex flex-col items-start gap-6 text-left">
        <motion.div
          className="section-kicker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Activity className="h-3.5 w-3.5" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1
          className="max-w-5xl text-balance text-[clamp(3rem,10.5vw,7.4rem)] font-black leading-[0.86] tracking-tighter text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.6), 0 0 60px rgba(255, 255, 255, 0.08)",
          }}
        >
          David Knežević
        </motion.h1>

        <motion.div
          className="flex min-h-12 items-center border-l-2 border-[oklch(0.66_0.22_31)] pl-5 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[oklch(0.66_0.22_31)] via-[oklch(0.79_0.16_170)] to-transparent" />
          <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            <TypingEffect
              phrases={heroContent.dynamicPhrases}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
          </p>
        </motion.div>

        <motion.p
          className="section-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            className="group h-12 rounded-lg bg-[oklch(0.66_0.22_31)] px-7 font-bold text-white shadow-2xl shadow-[oklch(0.66_0.22_31_/_0.4)] hover:bg-[oklch(0.72_0.22_31)] hover:shadow-[oklch(0.66_0.22_31_/_0.6)] border border-[oklch(0.66_0.22_31_/_0.3)]"
            asChild
          >
            <Link href="/quiz" className="flex items-center gap-2">
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-lg border-white/25 bg-white/[0.08] px-7 font-semibold text-white hover:border-[oklch(0.79_0.16_170_/_0.7)] hover:bg-white/[0.14] backdrop-blur-md"
            asChild
          >
            <Link href="/programs">{t("hero.secondaryCta")}</Link>
          </Button>
        </motion.div>

        <motion.div
          className="hidden w-full grid-cols-1 gap-4 pt-4 sm:grid sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {trainingSignals.map((signal, index) => (
            <motion.div
              key={signal.label}
              className="group border-l-2 border-white/20 pl-4 transition-all duration-300 hover:border-[oklch(0.79_0.16_170)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 transition-colors duration-300 group-hover:text-white/70">
                <signal.icon className="h-4 w-4 text-[oklch(0.79_0.16_170)] transition-transform duration-300 group-hover:scale-110" />
                {signal.label}
              </div>
              <div className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-[oklch(0.86_0.18_112)]">{signal.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="tactical-card hidden p-5 sm:block lg:p-6"
        style={{ "--glass-accent": "oklch(0.79 0.16 170)" } as CSSProperties}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">Coach index</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white">
              Built for measurable change
            </h2>
          </div>
          <motion.div
            className="rounded-lg border border-[oklch(0.79_0.16_170_/_0.4)] bg-[oklch(0.79_0.16_170_/_0.15)] p-3 text-[oklch(0.86_0.18_112)] shadow-lg shadow-[oklch(0.79_0.16_170_/_0.2)]"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Zap className="h-5 w-5" />
          </motion.div>
        </div>

        <div className="space-y-5">
          {scoreLines.map((line, index) => (
            <motion.div
              key={line.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-white/80">{line.label}</span>
                <span className="font-mono font-bold text-white">{line.value}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,oklch(0.66_0.22_31),oklch(0.79_0.16_170))] shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: line.width }}
                  transition={{ duration: 1.2, delay: 0.7 + index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="my-6 accent-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        <motion.div
          className="grid grid-cols-2 gap-4 text-sm text-white/72"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <div className="group">
            <div className="font-mono text-3xl font-black text-white transition-colors duration-300 group-hover:text-[oklch(0.79_0.16_170)]">500+</div>
            <div className="transition-colors duration-300 group-hover:text-white/90">clients guided</div>
          </div>
          <div className="group">
            <div className="font-mono text-3xl font-black text-white transition-colors duration-300 group-hover:text-[oklch(0.86_0.18_112)]">98%</div>
            <div className="transition-colors duration-300 group-hover:text-white/90">success signal</div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.86_0.18_112)]" />
          <p className="text-sm leading-6 text-white/75">
            Programs are structured around training load, recovery, nutrition habits, and
            weekly accountability.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
