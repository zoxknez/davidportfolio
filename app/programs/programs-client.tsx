"use client";

import { useState, useEffect } from "react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProgramsClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <Link href="/">← Home</Link>
          </Button>
        </div>

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

