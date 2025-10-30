"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Step = 0 | 1 | 2;

export default function QuizPage() {
  const [step, setStep] = useState<Step>(0);
  const [goal, setGoal] = useState("fat-loss");
  const [days, setDays] = useState(3);
  const [sex, setSex] = useState("male");

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">Find your program</h1>
        {step === 0 && (
          <section className="rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">What is your primary goal?</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["fat-loss", "Fat Loss"],
                ["muscle", "Build Muscle"],
                ["performance", "Performance"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setGoal(val)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                    goal === val ? "border-foreground" : "border-zinc-200 dark:border-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setStep(1)}>Next</Button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">How many days per week can you train?</p>
            <div className="mt-3 flex gap-2">
              {[2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    days === d ? "border-foreground" : "border-zinc-200 dark:border-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-2xl border bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Sex</p>
            <div className="mt-3 flex gap-2">
              {[
                ["male", "Male"],
                ["female", "Female"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSex(val)}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    sex === val ? "border-foreground" : "border-zinc-200 dark:border-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button asChild>
                <a href={`/recommendation?goal=${goal}&days=${days}&sex=${sex}`}>See Recommendation</a>
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


