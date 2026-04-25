"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Zap, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

interface SuccessStory {
  name: string;
  achievement: string;
  description: string;
  timeframe: string;
  image?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

interface SuccessStoriesProps {
  stories: SuccessStory[];
  title?: string;
  subtitle?: string;
}

export function SuccessStories({
  stories,
  title = "Success Stories",
  subtitle = "Real results from real people",
}: SuccessStoriesProps) {
  const icons: LucideIcon[] = [TrendingUp, Award, Zap];
  const accents = [
    "oklch(0.66 0.22 31)",
    "oklch(0.79 0.16 170)",
    "oklch(0.86 0.18 112)",
  ];

  return (
    <div className="w-full">
      <motion.div 
        className="mb-10 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="section-kicker">Client outcomes</div>
          <h2 className="section-title">
            {title}
          </h2>
        </div>
        <p className="section-copy lg:justify-self-end">
          {subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => {
          const Icon = icons[index % icons.length]!;
          const accent = accents[index % accents.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group h-full"
            >
              <div
                className="tactical-card h-full transition-all duration-500 hover:scale-[1.02]"
                style={{ "--glass-accent": accent } as CSSProperties}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5 shadow-lg"
                  style={{
                    background: accent,
                    boxShadow: `0 2px 12px ${accent}40`
                  }}
                />

                {story.image ? (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                  </div>
                ) : (
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))]">
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0_1px,transparent_1px_20px)] opacity-35" />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="relative h-20 w-20 drop-shadow-2xl" style={{ color: accent }} />
                    </motion.div>
                    <span className="absolute bottom-5 left-6 font-mono text-xs font-bold uppercase tracking-wider text-white/40">
                      Transformation
                    </span>
                  </div>
                )}

                <div className="relative p-7 space-y-5">
                  <div>
                    <h3 className="mb-3 text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[oklch(0.86_0.18_112)]">
                      {story.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-3.5 py-1.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]">
                      <Award className="h-3.5 w-3.5" style={{ color: accent }} />
                      <span className="text-xs font-semibold text-white/85">
                        {story.achievement}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-white/75 transition-colors duration-300 group-hover:text-white/85">
                    {story.description}
                  </p>

                  {story.stats && story.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 border-t border-white/12 pt-5">
                      {story.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group/stat"
                        >
                          <div className="mb-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover/stat:text-white/80">
                            {stat.label}
                          </div>
                          <div className="font-mono text-2xl font-black text-white transition-all duration-300 group-hover/stat:scale-110" style={{ color: accent }}>
                            {stat.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 pt-2 text-xs font-bold text-white/65 transition-colors duration-300 group-hover:text-white/85">
                    <div className="h-px w-8 transition-all duration-300 group-hover:w-12" style={{ background: accent }} />
                    <span>{story.timeframe}</span>
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

