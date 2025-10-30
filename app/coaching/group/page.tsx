"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Sparkles, Clock, Trophy } from "lucide-react";

export default function GroupCoachingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    {
      icon: Users,
      title: "Community Support",
      description: "Train with like-minded individuals and build lasting connections.",
    },
    {
      icon: TrendingUp,
      title: "Motivation & Accountability",
      description: "Push yourself further with group energy and peer motivation.",
    },
    {
      icon: Calendar,
      title: "Regular Schedule",
      description: "Consistent weekly sessions to build habits and maintain momentum.",
    },
    {
      icon: Sparkles,
      title: "Dynamic Workouts",
      description: "Varied, engaging sessions designed for multiple fitness levels.",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Maximize results in structured 45-60 minute group sessions.",
    },
    {
      icon: Trophy,
      title: "Cost Effective",
      description: "Premium coaching at a fraction of 1-on-1 pricing.",
    },
  ];

  const groups = [
    {
      name: "Strength Foundations",
      schedule: "Mon, Wed, Fri • 6:00 PM",
      size: "8-12 people",
      price: 149,
      duration: "per month",
      description: "Build strength with fundamental movements and progressive overload.",
      level: "Beginner to Intermediate",
    },
    {
      name: "Performance Elite",
      schedule: "Tue, Thu, Sat • 7:00 AM",
      size: "6-10 people",
      price: 199,
      duration: "per month",
      description: "High-intensity training for athletes and advanced trainees.",
      level: "Advanced",
    },
    {
      name: "Functional Movement",
      schedule: "Mon, Wed • 6:30 PM",
      size: "10-15 people",
      price: 129,
      duration: "per month",
      description: "Improve mobility, stability, and movement quality.",
      level: "All Levels",
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
            Group Coaching
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Train together, grow together. Join a supportive community of athletes.
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

        {/* Group Classes */}
        <div className={`mt-12 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Available Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {groups.map((group, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{group.name}</h3>
                  <p className="text-xs text-white/70 mb-3">{group.description}</p>
                  <div className="space-y-1.5 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{group.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5" />
                      <span>{group.size}</span>
                    </div>
                    <div>
                      <span className="text-white/80">Level: </span>
                      {group.level}
                    </div>
                  </div>
                </div>
                <div className="mb-4 pt-4 border-t border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-white">${group.price}</span>
                    <span className="text-xs text-white/60">/{group.duration}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full h-11 rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10"
                  asChild
                >
                  <a href="/contact">Join Group</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

