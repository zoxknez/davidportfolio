"use client";

import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useMounted } from "@/hooks/use-mounted";
import { BackButton } from "@/components/back-button";
import { AnimatedBackground } from "@/components/animated-background";
import { Filter, Grid3x3, Sparkles } from "lucide-react";

export default function ProgramsClient() {
  const mounted = useMounted();

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton />

        {/* Header with badge */}
        <div className="mt-14 sm:mt-16 mb-8 sm:mb-12">
          <div className={`transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <Sparkles className="h-4 w-4 text-white/80" />
              <span className="text-xs sm:text-sm font-medium text-white/90">
                {programs.length} Premium Programs
              </span>
            </div>

            {/* Title and description */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                  Training Programs
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                  Choose from our collection of scientifically-designed programs. 
                  Each program is crafted to deliver results, no matter your experience level.
                </p>
              </div>
              
              {/* Future filter/sort options */}
              <div className="flex gap-2">
                <button className="p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10" aria-label="Filter programs">
                  <Filter className="h-5 w-5 text-white/70" />
                </button>
                <button className="p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10" aria-label="Grid view">
                  <Grid3x3 className="h-5 w-5 text-white/70" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Programs Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
          {programs.map((p, index) => (
            <ScrollReveal key={p.slug} delay={index * 0.1} direction="up">
              <ProgramCard program={p} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="mt-16 mb-8 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Can't Find the Perfect Program?
              </h2>
              <p className="text-white/70 mb-6 max-w-xl mx-auto">
                Get a personalized program designed specifically for your goals, experience level, and schedule.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
              >
                Request Custom Program
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}

