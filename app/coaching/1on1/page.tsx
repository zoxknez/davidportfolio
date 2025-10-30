"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Calendar, Video, MessageSquare, Target, Award } from "lucide-react";

export default function OneOnOneCoachingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    {
      icon: Target,
      title: "Personalized Training",
      description: "Customized workout plans tailored to your goals, fitness level, and schedule.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your lifestyle. Available for in-person or virtual coaching.",
    },
    {
      icon: Video,
      title: "Virtual Sessions",
      description: "Train from anywhere with high-quality video coaching sessions.",
    },
    {
      icon: MessageSquare,
      title: "Ongoing Support",
      description: "Direct messaging between sessions for questions and adjustments.",
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Regular assessments and data-driven adjustments to maximize results.",
    },
    {
      icon: User,
      title: "Individual Attention",
      description: "Focused guidance on form, technique, and movement quality.",
    },
  ];

  const packages = [
    {
      name: "Starter",
      sessions: 4,
      price: 399,
      duration: "1 month",
      features: ["4x 60min sessions", "Custom program", "Messaging support", "Form analysis"],
    },
    {
      name: "Premium",
      sessions: 8,
      price: 699,
      duration: "1 month",
      features: ["8x 60min sessions", "Custom program", "Priority messaging", "Nutrition guidance", "Progress tracking"],
    },
    {
      name: "Elite",
      sessions: 12,
      price: 999,
      duration: "1 month",
      features: ["12x 60min sessions", "Custom program", "24/7 support", "Full nutrition plan", "Regular check-ins", "Video analysis"],
    },
  ];

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <a href="/">← Home</a>
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 pt-0">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            1-on-1 Coaching
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Personalized training tailored to your unique goals and needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 w-fit mb-3">
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-white/70">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Packages */}
        <div className={`mt-12 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Choose Your Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-white">${pkg.price}</span>
                    <span className="text-xs text-white/60">/{pkg.duration}</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">{pkg.sessions} sessions</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                      <span className="text-white/50 mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  className="w-full h-11 rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10"
                  asChild
                >
                  <a href="/contact">Get Started</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

