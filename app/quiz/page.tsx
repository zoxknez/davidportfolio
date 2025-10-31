"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizProgress } from "@/components/quiz-progress";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { buttonStyles } from "@/lib/styles";

type Step = 0 | 1 | 2;

export default function QuizPage() {
  const mounted = useMounted();
  const [step, setStep] = useState<Step>(0);
  const [goal, setGoal] = useState("fat-loss");
  const [days, setDays] = useState(3);
  const [sex, setSex] = useState("male");

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6 py-16 sm:py-12 z-10">
        <BackButton />
        
        <div className={`flex w-full max-w-md flex-col items-center gap-4 sm:gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">Find your program</h1>
          <QuizProgress current={step + 1} total={3} />
        </div>

        {step === 0 && (
          <div className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <p className="text-center text-sm text-white/70">What is your primary goal?</p>
            <div className="flex flex-col gap-3">
              {[
                ["fat-loss", "Fat Loss"],
                ["muscle", "Build Muscle"],
                ["performance", "Performance"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setGoal(val as string)}
                  className={`rounded-full border px-6 py-4 text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    goal === val 
                      ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(1)}
              >
                Next →
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <p className="text-center text-sm text-white/70">How many days per week can you train?</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[2, 3, 4, 5, 6].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    days === d 
                      ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <Button 
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(0)}
              >
                ← Back
              </Button>
              <Button 
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(2)}
              >
                Next →
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <p className="text-center text-sm text-white/70">Sex</p>
            <div className="flex gap-3">
              {[
                ["male", "Male"],
                ["female", "Female"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSex(val as string)}
                  className={`flex-1 rounded-full border px-6 py-4 text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    sex === val 
                      ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <Button 
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
              <Button 
                variant="ghost" 
                className={buttonStyles.secondary}
                asChild
              >
                <a href={`/recommendation?goal=${goal}&days=${days}&sex=${sex}`}>See Recommendation →</a>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
