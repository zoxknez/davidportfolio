"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizProgress } from "@/components/quiz-progress";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { buttonStyles } from "@/lib/styles";
import { Flame, Dumbbell, Zap, Calendar, User, Sparkles } from "lucide-react";

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
        
        <div className={`flex w-full max-w-md flex-col items-center gap-4 sm:gap-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-white/80 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-white/90">Personalized Recommendation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
            Find Your Perfect Program
          </h1>
          <QuizProgress current={step + 1} total={3} />
        </div>

        {step === 0 && (
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-all duration-500 animate-scale-in ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { e.preventDefault(); setStep(1); }}
            aria-label="Step 1 of 3: Select your fitness goal"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-lg font-semibold text-white w-full mb-6">What is your primary goal?</legend>
              <div className="flex flex-col gap-4">
                {[
                  { val: "fat-loss", label: "Fat Loss", Icon: Flame, desc: "Burn fat and get lean" },
                  { val: "muscle", label: "Build Muscle", Icon: Dumbbell, desc: "Gain strength and size" },
                  { val: "performance", label: "Performance", Icon: Zap, desc: "Boost athletic ability" },
                ].map((option, index) => (
                  <div key={option.val} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <input
                      type="radio"
                      id={`goal-${option.val}`}
                      name="goal"
                      value={option.val}
                      checked={goal === option.val}
                      onChange={() => setGoal(option.val)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor={`goal-${option.val}`}
                      className={`group relative block cursor-pointer rounded-2xl border px-6 py-5 transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black hover:-translate-y-1 ${
                        goal === option.val 
                          ? "border-white/40 bg-white/10 text-white shadow-2xl shadow-white/10 scale-105" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-xl hover:shadow-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`rounded-xl p-3 transition-all duration-300 ${goal === option.val ? 'bg-white/20 border border-white/30' : 'bg-white/10 border border-white/20 group-hover:bg-white/15'}`}>
                          <option.Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-base mb-1">{option.label}</div>
                          <div className="text-xs text-white/60 group-hover:text-white/70 transition-colors">{option.desc}</div>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-end pt-2">
              <Button 
                type="submit"
                variant="ghost" 
                className={`${buttonStyles.secondary} group`}
                aria-label="Continue to step 2"
              >
                Next
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-all duration-500 animate-scale-in ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { e.preventDefault(); setStep(2); }}
            aria-label="Step 2 of 3: Select training days per week"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-lg font-semibold text-white w-full mb-6">How many days per week can you train?</legend>
              <div className="flex flex-wrap justify-center gap-3">
                {[2, 3, 4, 5, 6].map((d, index) => (
                  <div key={d} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
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
                      className={`group relative flex flex-col items-center justify-center cursor-pointer rounded-2xl border px-6 py-5 text-sm font-semibold transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black hover:-translate-y-1 min-w-[80px] ${
                        days === d 
                          ? "border-white/40 bg-white/10 text-white shadow-2xl shadow-white/10 scale-105" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-xl hover:shadow-white/5"
                      }`}
                    >
                      <Calendar className="h-6 w-6 mb-2" />
                      <span className="text-2xl font-bold">{d}</span>
                      <span className="text-xs text-white/60 mt-1">days</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-between pt-2">
              <Button 
                type="button"
                variant="ghost" 
                className={`${buttonStyles.secondary} group`}
                onClick={() => setStep(0)}
                aria-label="Go back to step 1"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                Back
              </Button>
              <Button 
                type="submit"
                variant="ghost" 
                className={`${buttonStyles.secondary} group`}
                aria-label="Continue to step 3"
              >
                Next
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form 
            className={`flex w-full max-w-md flex-col gap-6 transition-all duration-500 animate-scale-in ${mounted ? "opacity-100" : "opacity-0"}`}
            onSubmit={(e) => { 
              e.preventDefault(); 
              window.location.href = `/recommendation?goal=${goal}&days=${days}&sex=${sex}`;
            }}
            aria-label="Step 3 of 3: Select your sex"
          >
            <fieldset className="border-0 p-0">
              <legend className="text-center text-lg font-semibold text-white w-full mb-6">Select your profile</legend>
              <div className="flex gap-4">
                {[
                  ["male", "Male"],
                  ["female", "Female"],
                ].map(([val, label], index) => (
                  <div key={val} className="flex-1 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
                      className={`group relative flex flex-col items-center justify-center cursor-pointer rounded-2xl border px-6 py-6 text-sm font-medium text-center transition-all duration-300 backdrop-blur-sm peer-focus:ring-2 peer-focus:ring-white/40 peer-focus:ring-offset-2 peer-focus:ring-offset-black hover:-translate-y-1 ${
                        sex === val 
                          ? "border-white/40 bg-white/10 text-white shadow-2xl shadow-white/10 scale-105" 
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-xl hover:shadow-white/5"
                      }`}
                    >
                      <User className="h-8 w-8 mb-3" />
                      <span className="font-semibold text-base">{label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="flex justify-between pt-2">
              <Button 
                type="button"
                variant="ghost" 
                className={`${buttonStyles.secondary} group`}
                onClick={() => setStep(1)}
                aria-label="Go back to step 2"
              >
                <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                Back
              </Button>
              <Button 
                type="submit"
                variant="ghost" 
                className={`${buttonStyles.secondary} group bg-white/15 hover:bg-white/25 border-white/30`}
                aria-label="View your personalized recommendation"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Get My Program
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
