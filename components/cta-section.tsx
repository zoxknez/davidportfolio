"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";

export function CtaSection() {
  return (
    <motion.div 
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-16">
        <TrendingUp className="h-16 w-16 text-white/80 mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Transform?
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Take the first step towards your fitness goals. Start with our personalized quiz to find the perfect program for you.
        </p>
        <a
          href="/quiz"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 bg-white/20 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
        >
          Start Your Journey
          <Zap className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  );
}
