"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
        David Knežević
      </h1>
      <p className="max-w-xl text-base text-white/80">
        Elite coaching. Minimal distractions.
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <Button className="h-12 rounded-full px-6 text-base" asChild>
          <a href="/quiz">Start Training</a>
        </Button>
        <Button variant="outline" className="h-12 rounded-full px-6 text-base" asChild>
          <a href="/programs">Programs</a>
        </Button>
      </div>
    </section>
  );
}


