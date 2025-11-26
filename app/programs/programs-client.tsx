"use client";

import { programs } from "@/data/programs";
import { ProgramFinder } from "@/components/program-finder";
import { useMounted } from "@/hooks/use-mounted";
import { BackButton } from "@/components/back-button";
import { AnimatedBackground } from "@/components/animated-background";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramsClient() {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

      <main className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton />

        {/* Header with badge */}
        <div className="mt-14 sm:mt-16 mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <Sparkles className="h-4 w-4 text-white/80" />
              <span className="text-xs sm:text-sm font-medium text-white/90">
                {programs.length} Premium Programs
              </span>
            </div>

            {/* Title and description */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                  Training Programs
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                  Choose from our collection of scientifically-designed programs. 
                  Each program is crafted to deliver results, no matter your experience level.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Program Finder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ProgramFinder programs={programs} />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 mb-8 text-center"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Can't Find the Perfect Program?
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Get a personalized program designed specifically for your goals, experience level, and schedule.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
            >
              Request Custom Program
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

