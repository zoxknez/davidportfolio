"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TrainingDropdown } from "@/components/training-dropdown";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className={`flex flex-col items-center gap-8 text-center transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white animate-fade-in" style={{
          textShadow: "0 2px 20px rgba(0, 0, 0, 0.5), 0 4px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
          letterSpacing: "-0.03em",
        }}>
          David Knežević
        </h1>
        <div className="h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-slide-up" style={{ animationDelay: "0.15s" }} />
        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/90 animate-slide-up tracking-wide" style={{ 
          animationDelay: "0.2s",
          textShadow: "0 2px 15px rgba(0, 0, 0, 0.5)",
          letterSpacing: "0.01em",
        }}>
          Elite coaching. Minimal distractions.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up flex-wrap mt-4" style={{ animationDelay: "0.3s" }}>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <Link href="/quiz">Start Training</Link>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <Link href="/programs">Programs</Link>
        </Button>
        <TrainingDropdown />
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <Link href="/media">Media</Link>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <Link href="/news">News</Link>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </section>
  );
}


