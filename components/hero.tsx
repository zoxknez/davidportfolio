"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrainingDropdown } from "@/components/training-dropdown";
import { TypingEffect } from "@/components/typing-effect";
import { heroContent } from "@/data/home-content";
import { useMounted } from "@/hooks/use-mounted";
import { buttonStyles } from "@/lib/styles";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  const mounted = useMounted();

  return (
    <section className={`flex flex-col items-center gap-10 text-center transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="flex flex-col items-center gap-6">
        {/* Floating badge */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-white/80 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-white/90">Premium Fitness Coaching</span>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white animate-fade-in" style={{
          textShadow: "0 2px 20px rgba(0, 0, 0, 0.5), 0 4px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
          letterSpacing: "-0.03em",
          animationDelay: "0.2s",
        }}>
          David Knežević
        </h1>
        
        <div className="h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-slide-up" style={{ animationDelay: "0.3s" }} />
        
        {/* Dynamic typing effect */}
        <div className="min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <p className="max-w-2xl text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white/90 tracking-wide" style={{ 
            textShadow: "0 2px 15px rgba(0, 0, 0, 0.5)",
            letterSpacing: "0.01em",
          }}>
            <TypingEffect phrases={heroContent.dynamicPhrases} typingSpeed={80} deletingSpeed={40} pauseDuration={2000} />
          </p>
        </div>

        {/* Subtitle */}
        <p className="max-w-xl text-sm sm:text-base text-white/70 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          {heroContent.subtitle}
        </p>
      </div>

      {/* CTA Buttons - Primary action highlighted */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up w-full max-w-md" style={{ animationDelay: "0.6s" }}>
        <Button 
          variant="ghost" 
          className="group relative w-full sm:w-auto h-12 px-8 rounded-full border-2 border-white/30 bg-white/20 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
          asChild
        >
          <Link href="/quiz" className="flex items-center gap-2">
            Start Training
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`${buttonStyles.primary} w-full sm:w-auto h-12`}
          asChild
        >
          <Link href="/programs">View Programs</Link>
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row animate-slide-up flex-wrap" style={{ animationDelay: "0.7s" }}>
        <TrainingDropdown />
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/media">Media</Link>
        </Button>
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/news">News</Link>
        </Button>
        <Button variant="ghost" className={buttonStyles.primary} asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </section>
  );
}


