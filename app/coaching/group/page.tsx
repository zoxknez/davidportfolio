"use client";

import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Sparkles, Clock, Trophy, UserPlus } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { motion } from "framer-motion";

export default function GroupCoachingPage() {
  const mounted = useMounted();

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
              <Users className="h-4 w-4 text-white/80 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/90">Community-Driven Training</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Group Coaching
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
              Train together, grow together. Join a supportive community of athletes and achieve your goals faster.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Group Classes */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">Available Groups</h2>
          <p className="text-white/70 mb-10 text-center max-w-2xl mx-auto">
            Find the perfect group that matches your schedule and fitness level
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groups.map((group, idx) => {
              const isFeatured = idx === 1;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className={`group relative h-full rounded-3xl border backdrop-blur-xl p-7 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    isFeatured 
                      ? "border-white/30 bg-white/10 shadow-xl shadow-white/10" 
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:shadow-white/10"
                  }`}>
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10 ${isFeatured ? 'opacity-50' : ''}`} />
                    
                    {/* Featured badge */}
                    {isFeatured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="mb-5">
                      <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                      <p className="text-sm text-white/70 mb-4 leading-relaxed">{group.description}</p>
                      
                      <div className="space-y-2.5 text-sm text-white/80 mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-white/60" />
                          <span>{group.schedule}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-4 w-4 text-white/60" />
                          <span>{group.size}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Trophy className="h-4 w-4 text-white/60" />
                          <span className="text-white/70">Level: <span className="text-white font-medium">{group.level}</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6 pt-5 border-t border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">${group.price}</span>
                        <span className="text-sm text-white/60">/{group.duration}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      className={`w-full h-12 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-xl group ${
                        isFeatured
                          ? "border-2 border-white/40 bg-white/20 text-white hover:bg-white/30 hover:border-white/50 hover:scale-105"
                          : "border border-white/20 bg-white/10 text-white/90 hover:border-white/30 hover:bg-white/15 hover:text-white"
                      }`}
                      asChild
                    >
                      <a href="/contact" className="flex items-center justify-center gap-2">
                        Join This Group
                        <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
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

