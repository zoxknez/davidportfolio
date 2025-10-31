"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 sm:px-6 py-12 z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">Something went wrong</h1>
          <p className="text-sm text-white/70 mb-2">
            We encountered an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p className="text-xs text-white/50 mb-6 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={reset}
            className="h-11 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Try Again
          </Button>
          <Button
            variant="ghost"
            className="h-11 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
