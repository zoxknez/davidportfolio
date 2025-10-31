"use client";

import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { useMounted } from "@/hooks/use-mounted";
import { BackButton } from "@/components/back-button";
import { AnimatedBackground } from "@/components/animated-background";

export default function ProgramsClient() {
  const mounted = useMounted();

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton />

        <div className={`mb-6 sm:mb-8 mt-14 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Programs</h1>
          <span className="text-xs sm:text-sm text-white/60">{programs.length} programs</span>
        </div>

        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </main>
    </div>
  );
}

