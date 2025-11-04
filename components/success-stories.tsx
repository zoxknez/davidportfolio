"use client";

import { ScrollReveal } from "./scroll-reveal";
import { TrendingUp, Award, Zap, type LucideIcon } from "lucide-react";

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

  return (
    <div className="w-full">
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {title}
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => {
          const Icon = icons[index % icons.length]!;
          return (
            <ScrollReveal
              key={index}
              delay={index * 0.15}
              direction="up"
              className="group h-full"
            >
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image or placeholder */}
                {story.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-48 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-white/30" />
                  </div>
                )}

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {story.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
                      <Award className="h-3 w-3 text-white/80" />
                      <span className="text-xs font-medium text-white/80">
                        {story.achievement}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/70 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Stats */}
                  {story.stats && story.stats.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
                      {story.stats.map((stat, i) => (
                        <div key={i} className="flex-1 min-w-[100px]">
                          <div className="text-xs text-white/60 mb-1">
                            {stat.label}
                          </div>
                          <div className="text-lg font-bold text-white">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timeframe */}
                  <div className="flex items-center gap-2 text-xs text-white/60 pt-2">
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{story.timeframe}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

