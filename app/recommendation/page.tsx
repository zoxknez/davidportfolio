"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function RecommendationPage({ searchParams }: { searchParams: Record<string, string> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const goal = searchParams.goal ?? "fat-loss";
  const days = Number(searchParams.days ?? 3);
  const sex = searchParams.sex ?? "male";

  const pick = (() => {
    if (goal === "muscle") return "functional-bodybuilding";
    if (goal === "performance") return "hyrox-prep";
    return sex === "female" ? "womens-strength" : "functional-bodybuilding";
  })();

  const label = {
    "functional-bodybuilding": "Functional Bodybuilding",
    "hyrox-prep": "HYROX Prep",
    "womens-strength": "Women's Strength",
  }[pick];

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <a href="/">← Home</a>
          </Button>
        </div>
        
        <div className="mt-12 sm:mt-16 md:mt-20 pt-0">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            Your Recommendation
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Goal: <strong className="text-white">{goal}</strong> • Days/week: <strong className="text-white">{days}</strong> • Sex: <strong className="text-white">{sex}</strong>
          </p>
        </div>
        <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-base sm:text-lg font-semibold text-white">{label}</h2>
          <p className="mt-2 text-xs sm:text-sm text-white/70">
            Personalized pick based on your answers. Full logic will be powered by rules later.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button 
              variant="ghost" 
              className="h-11 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
              asChild
            >
              <a href={`/programs/${pick}`}>View Program</a>
            </Button>
            <Button 
              variant="ghost" 
              className="h-11 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
              asChild
            >
              <a href="/programs">See All</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
