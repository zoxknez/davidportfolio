"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className={`flex flex-col items-center gap-6 text-center transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl animate-fade-in">
        David Knežević
      </h1>
      <p className="max-w-xl text-base text-white/80 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        Elite coaching. Minimal distractions.
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row animate-slide-up flex-wrap" style={{ animationDelay: "0.2s" }}>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <a href="/quiz">Start Training</a>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <a href="/programs">Programs</a>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <a href="/coaching/1on1">1-on-1</a>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <a href="/coaching/group">Group</a>
        </Button>
        <Button variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" asChild>
          <a href="/contact">Contact</a>
        </Button>
      </div>
    </section>
  );
}


