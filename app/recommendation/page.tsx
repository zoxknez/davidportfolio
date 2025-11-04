"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { buttonStyles } from "@/lib/styles";
import { CheckCircle2, Sparkles, Trophy, Target, Calendar, TrendingUp, ArrowRight } from "lucide-react";

function RecommendationContent() {
  const mounted = useMounted();
  const searchParams = useSearchParams();

  const goal = searchParams.get("goal") ?? "fat-loss";
  const days = Number(searchParams.get("days") ?? 3);
  const sex = searchParams.get("sex") ?? "male";

  const pick = (() => {
    if (goal === "muscle") return "functional-bodybuilding";
    if (goal === "performance") return "hyrox-prep";
    return sex === "female" ? "womens-strength" : "functional-bodybuilding";
  })();

  const programDetails = {
    "functional-bodybuilding": {
      name: "Functional Bodybuilding",
      description: "Perfect blend of strength, aesthetics, and functionality",
      weeks: 12,
      matchScore: 95,
      highlights: ["Muscle growth", "Functional strength", "Balanced approach"],
    },
    "hyrox-prep": {
      name: "HYROX Prep",
      description: "Elite performance training for athletes",
      weeks: 8,
      matchScore: 98,
      highlights: ["Peak performance", "Competition ready", "High intensity"],
    },
    "womens-strength": {
      name: "Women's Strength",
      description: "Tailored program for female athletes",
      weeks: 10,
      matchScore: 92,
      highlights: ["Female-specific", "Strength focus", "Empowerment"],
    },
  }[pick];

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-8 px-4 sm:px-6 py-8 sm:py-12 z-10">
      <BackButton />
      
      {/* Celebration Badge */}
      <div className={`mt-12 sm:mt-16 flex flex-col items-center gap-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl animate-bounce-subtle">
          <Trophy className="h-5 w-5 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-300">Perfect Match Found!</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
          {programDetails?.name}
        </h1>
        
        <p className="text-lg text-white/80 text-center max-w-xl">
          {programDetails?.description}
        </p>

        {/* Match Score */}
        <div className="relative">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
            <Target className="h-6 w-6 text-white/80" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter end={programDetails?.matchScore || 0} suffix="%" duration={1500} />
              </div>
              <div className="text-xs text-white/60">Match Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Selections */}
      <div className={`grid grid-cols-3 gap-3 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center">
          <div className="text-xs text-white/60 mb-2">Goal</div>
          <div className="font-semibold text-white capitalize">{goal.replace("-", " ")}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center">
          <div className="text-xs text-white/60 mb-2">Days/Week</div>
          <div className="font-semibold text-white">{days} days</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center">
          <div className="text-xs text-white/60 mb-2">Profile</div>
          <div className="font-semibold text-white capitalize">{sex}</div>
        </div>
      </div>

      {/* Program Card */}
      <div className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/10 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
        <div className="flex items-start gap-4 mb-6">
          <div className="rounded-xl border border-white/20 bg-white/10 p-3">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Why This Program?</h2>
            <p className="text-sm text-white/70">
              Based on your goals and availability, this program is tailored to deliver maximum results.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid gap-3 mb-6">
          {programDetails?.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <span className="text-white/90">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Program Details */}
        <div className="flex items-center gap-6 mb-6 py-4 border-y border-white/10">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-white/60" />
            <span className="text-sm text-white/80">{programDetails?.weeks} weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-white/60" />
            <span className="text-sm text-white/80">Proven results</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="ghost" 
            className="flex-1 h-12 rounded-xl border-2 border-white/30 bg-white/15 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/25 hover:shadow-xl hover:shadow-white/20 hover:scale-105 group"
            asChild
          >
            <Link href={`/programs/${pick}`} className="flex items-center justify-center gap-2">
              View Full Program
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className={`${buttonStyles.secondary} h-12`}
            asChild
          >
            <Link href="/programs">Explore All Programs</Link>
          </Button>
        </div>
      </div>

      {/* Retake Quiz Link */}
      <div className="text-center">
        <Link href="/quiz" className="text-sm text-white/60 hover:text-white/90 transition-colors underline">
          Not quite right? Retake the quiz
        </Link>
      </div>
    </main>
  );
}

export default function RecommendationPage() {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

      <Suspense fallback={
        <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 sm:px-6 py-4 sm:py-12 z-10 items-center justify-center">
          <div className="text-white/70">Loading...</div>
        </main>
      }>
        <RecommendationContent />
      </Suspense>
    </div>
  );
}
