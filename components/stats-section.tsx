"use client";

import { AnimatedCounter } from "./animated-counter";
import { ScrollReveal } from "./scroll-reveal";

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
  return (
    <div className="w-full">
      {(title || subtitle) && (
        <ScrollReveal className="text-center mb-12">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </ScrollReveal>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <ScrollReveal
            key={index}
            delay={index * 0.1}
            direction="up"
            className="group"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-white/5 hover:-translate-y-1">
              {/* Animated glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000}
                  />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white/80 mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-white/60">
                    {stat.description}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

