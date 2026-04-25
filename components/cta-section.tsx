"use client";

import { Link } from "@/lib/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, TrendingUp, Zap } from "lucide-react";
import type { CSSProperties } from "react";

export function CtaSection() {
  return (
    <motion.div
      className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="section-kicker">
          <Zap className="h-3.5 w-3.5" />
          Start today
        </div>
        <h2 className="section-title max-w-4xl">
          Ready to train with a plan that holds up after week one?
        </h2>
        <p className="section-copy mt-6">
          Start with the quiz, get matched to the right training path, and move into
          a system that measures effort, recovery, and results.
        </p>
      </motion.div>

      <motion.div
        className="tactical-card p-6 sm:p-8"
        style={{ "--glass-accent": "oklch(0.66 0.22 31)" } as CSSProperties}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="mb-6 flex items-center gap-4">
          <motion.div
            className="rounded-xl border border-[oklch(0.66_0.22_31_/_0.4)] bg-[oklch(0.66_0.22_31_/_0.15)] p-4 text-[oklch(0.76_0.2_31)] shadow-lg shadow-[oklch(0.66_0.22_31_/_0.25)]"
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="h-6 w-6" />
          </motion.div>
          <div>
            <div className="text-lg font-black text-white">Personal training route</div>
            <div className="text-sm text-white/60">Quiz, plan, accountability</div>
          </div>
        </div>

        <div className="mb-7 space-y-4 border-y border-white/12 py-6 text-sm text-white/75">
          {[
            { label: "Goal clarity", num: "01" },
            { label: "Training schedule", num: "02" },
            { label: "Progress rhythm", num: "03" }
          ].map((item, i) => (
            <motion.div
              key={item.num}
              className="flex items-center justify-between gap-4 transition-colors duration-300 hover:text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <span className="font-medium">{item.label}</span>
              <span className="font-mono font-bold text-white">{item.num}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quiz"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[oklch(0.66_0.22_31)] px-6 text-sm font-bold text-white shadow-2xl shadow-[oklch(0.66_0.22_31_/_0.4)] transition-all duration-300 hover:scale-105 hover:bg-[oklch(0.72_0.22_31)] hover:shadow-[oklch(0.66_0.22_31_/_0.6)] border border-[oklch(0.66_0.22_31_/_0.3)]"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-6 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[oklch(0.79_0.16_170_/_0.6)] hover:bg-white/[0.14] hover:shadow-lg"
          >
            <CalendarCheck className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Contact
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
