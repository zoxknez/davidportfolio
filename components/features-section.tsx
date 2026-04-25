"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
}

export function FeaturesSection({
  features,
  title,
  subtitle,
  columns = 3,
}: FeaturesSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

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
          className="mb-10 grid gap-6 lg:grid-cols-[0.86fr_1fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="section-kicker">Training architecture</div>
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

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-3 sm:gap-4`}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const accent = accents[index % accents.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div
                className="tactical-card h-full p-6 transition-all duration-500 hover:scale-[1.02] sm:p-7"
                style={{ "--glass-accent": accent } as CSSProperties}
              >
                <div
                  className="absolute inset-y-0 left-0 w-1.5 shadow-lg transition-all duration-500 group-hover:w-2"
                  style={{
                    background: accent,
                    boxShadow: `0 0 20px ${accent}40`
                  }}
                />

                <div className="relative z-10 flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <motion.div
                      className="rounded-xl border border-white/15 bg-white/[0.09] p-3.5 text-white shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl"
                      style={{ color: accent }}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <span className="font-mono text-sm font-bold text-white/40 transition-colors duration-300 group-hover:text-white/60">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-black leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[oklch(0.86_0.18_112)]">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/72 transition-colors duration-300 group-hover:text-white/85">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

