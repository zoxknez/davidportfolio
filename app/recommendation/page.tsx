"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { buttonStyles } from "@/lib/styles";

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

  const label = {
    "functional-bodybuilding": "Functional Bodybuilding",
    "hyrox-prep": "HYROX Prep",
    "womens-strength": "Women's Strength",
  }[pick];

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 sm:px-6 py-4 sm:py-12 z-10">
      <BackButton />
      
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
            className={buttonStyles.secondary}
            asChild
          >
            <Link href={`/programs/${pick}`}>View Program</Link>
          </Button>
          <Button 
            variant="ghost" 
            className={buttonStyles.secondary}
            asChild
          >
            <Link href="/programs">See All</Link>
          </Button>
        </div>
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
