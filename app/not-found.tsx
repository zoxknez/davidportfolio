"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
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

      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <Link href="/">← Home</Link>
          </Button>
        </div>
        
        <div className={`text-center transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold text-white">404</h1>
          <p className="mt-4 text-base sm:text-lg text-white/70">Page not found</p>
          <p className="mt-2 text-xs sm:text-sm text-white/60">The page you're looking for doesn't exist.</p>
        </div>

        <div className={`transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <Button
            variant="ghost"
            className="h-11 sm:h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10"
            asChild
          >
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

