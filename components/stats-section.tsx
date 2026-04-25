"use client";

import { AnimatedCounter } from "./animated-counter";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
}

export function StatsSection({ stats, title, subtitle }: StatsSectionProps) {
  const accents = [
    "oklch(0.66 0.22 31)",
    "oklch(0.79 0.16 170)",
    "oklch(0.86 0.18 112)",
    "oklch(0.72 0.18 258)",
  ];

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <motion.div 
          className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="section-kicker">Measured progress</div>
            {title && (
              <h2 className="section-title">
                {title}
              </h2>
            )}
          </div>
          {subtitle && (
            <p className="section-copy lg:justify-self-end">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
          >
            <div
              className="tactical-card h-full p-5 transition-all duration-500 hover:scale-[1.02] sm:p-7"
              style={{ "--glass-accent": accents[index % accents.length] } as CSSProperties}
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5 shadow-lg"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(90deg, oklch(0.66 0.22 31), transparent)"
                      : "linear-gradient(90deg, oklch(0.79 0.16 170), transparent)",
                  boxShadow: index % 2 === 0
                    ? "0 2px 10px oklch(0.66 0.22 31 / 0.3)"
                    : "0 2px 10px oklch(0.79 0.16 170 / 0.3)",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="mb-3 font-mono text-4xl font-black tabular-nums text-white transition-all duration-300 group-hover:scale-110 sm:text-5xl lg:text-6xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000}
                  />
                </div>
                <div className="mb-2 text-sm font-bold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white sm:text-base">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80">
                    {stat.description}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

