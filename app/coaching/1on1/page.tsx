"use client";

import { Button } from "@/components/ui/button";
import { User, Calendar, Video, MessageSquare, Target, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { motion } from "framer-motion";

export default function OneOnOneCoachingPage() {
  const mounted = useMounted();

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

  if (!mounted) return null;

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden bg-black">
      <main className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <a href="/">← Home</a>
          </Button>
        </div>

        {/* Header */}
        <div className="mt-16 sm:mt-20 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <Sparkles className="h-4 w-4 text-white/80 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/90">Premium 1-on-1 Training</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Personal Coaching
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              Transform your fitness with personalized attention, expert guidance, and proven training methods.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="group relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2">
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                  
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3 w-fit mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 transition-colors group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed transition-colors group-hover:text-white/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Packages */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Choose Your Package</h2>
          <p className="text-white/70 mb-10 text-center max-w-2xl mx-auto">
            Select the coaching plan that fits your schedule and goals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => {
              const isPopular = idx === 1; // Middle package is popular
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className={`group relative h-full rounded-3xl border backdrop-blur-xl p-7 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    isPopular 
                      ? "border-white/30 bg-white/10 shadow-xl shadow-white/10 scale-105" 
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-white/10"
                  }`}>
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10 ${isPopular ? 'opacity-50' : ''}`} />
                    
                    {/* Popular badge */}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold text-white">${pkg.price}</span>
                        <span className="text-sm text-white/60">/{pkg.duration}</span>
                      </div>
                      <p className="text-sm text-white/70">{pkg.sessions} premium sessions</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      variant="ghost"
                      className={`w-full h-12 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-xl group ${
                        isPopular
                          ? "border-2 border-white/40 bg-white/20 text-white hover:bg-white/30 hover:border-white/50 hover:scale-105"
                          : "border border-white/20 bg-white/10 text-white/90 hover:border-white/30 hover:bg-white/15 hover:text-white"
                      }`}
                      asChild
                    >
                      <a href="/contact" className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

