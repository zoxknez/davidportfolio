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
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { e.preventDefault(); setStep(1); }}
            aria-label="Step 1 of 3: Select your fitness goal"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-sm text-white/70 w-full mb-4">What is your primary goal?</legend>
              <div className="flex flex-col gap-3">
                {[
                  ["fat-loss", "Fat Loss"],
                  ["muscle", "Build Muscle"],
                  ["performance", "Performance"],
                ].map(([val, label]) => (
                  <div key={val}>
                    <input
                      type="radio"
                      id={`goal-${val}`}
                      name="goal"
                      value={val}
                      checked={goal === val}
                      onChange={() => setGoal(val as string)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`goal-${val}`}
                      className={`block cursor-pointer rounded-full border px-6 py-4 text-sm font-medium text-center transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black ${
                        goal === val 
                          ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-end pt-2">
              <Button 
                type="submit"
                variant="ghost" 
                className={buttonStyles.secondary}
                aria-label="Continue to step 2"
              >
                Next →
              </Button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { e.preventDefault(); setStep(2); }}
            aria-label="Step 2 of 3: Select training days per week"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-sm text-white/70 w-full mb-4">How many days per week can you train?</legend>
              <div className="flex flex-wrap justify-center gap-3">
                {[2, 3, 4, 5, 6].map((d) => (
                  <div key={d}>
                    <input
                      type="radio"
                      id={`days-${d}`}
                      name="days"
                      value={d}
                      checked={days === d}
                      onChange={() => setDays(d)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`days-${d}`}
                      className={`block cursor-pointer rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black ${
                        days === d 
                          ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {d}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-between pt-2">
              <Button 
                type="button"
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(0)}
                aria-label="Go back to step 1"
              >
                ← Back
              </Button>
              <Button 
                type="submit"
                variant="ghost" 
                className={buttonStyles.secondary}
                aria-label="Continue to step 3"
              >
                Next →
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { 
              e.preventDefault(); 
              window.location.href = `/recommendation?goal=${goal}&days=${days}&sex=${sex}`;
            }}
            aria-label="Step 3 of 3: Select your sex"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-sm text-white/70 w-full mb-4">Sex</legend>
              <div className="flex gap-3">
                {[
                  ["male", "Male"],
                  ["female", "Female"],
                ].map(([val, label]) => (
                  <div key={val} className="flex-1">
                    <input
                      type="radio"
                      id={`sex-${val}`}
                      name="sex"
                      value={val}
                      checked={sex === val}
                      onChange={() => setSex(val as string)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`sex-${val}`}
                      className={`block cursor-pointer rounded-full border px-6 py-4 text-sm font-medium text-center transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black ${
                        sex === val 
                          ? "border-white/40 bg-white/10 text-white shadow-lg shadow-white/10" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-between pt-2">
              <Button 
                type="button"
                variant="ghost" 
                className={buttonStyles.secondary}
                onClick={() => setStep(1)}
                aria-label="Go back to step 2"
              >
                ← Back
              </Button>
              <Button 
                type="submit"
                variant="ghost" 
                className={buttonStyles.secondary}
                aria-label="View your personalized recommendation"
              >
                See Recommendation →
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
