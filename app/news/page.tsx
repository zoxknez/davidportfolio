"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function NewsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const newsItems = [
    {
      id: 1,
      title: "5 Fundamental Movement Patterns for Strength",
      excerpt: "Master these essential patterns to build a solid foundation for any training program.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Training",
    },
    {
      id: 2,
      title: "The Science Behind Progressive Overload",
      excerpt: "Understanding how to systematically increase training stress to drive continuous adaptation.",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Science",
    },
    {
      id: 3,
      title: "Nutrition Timing for Performance Athletes",
      excerpt: "Optimize your meal timing around training sessions to maximize recovery and performance.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Nutrition",
    },
    {
      id: 4,
      title: "Building Mental Resilience Through Training",
      excerpt: "How structured physical challenges develop mental toughness applicable to all areas of life.",
      date: "2023-12-28",
      readTime: "8 min read",
      category: "Mindset",
    },
    {
      id: 5,
      title: "Recovery Protocols for High-Volume Training",
      excerpt: "Essential strategies for managing fatigue and maximizing adaptation between sessions.",
      date: "2023-12-20",
      readTime: "6 min read",
      category: "Recovery",
    },
    {
      id: 6,
      title: "Periodization Principles for Long-Term Progress",
      excerpt: "Learn how to structure your training across weeks and months to avoid plateaus.",
      date: "2023-12-15",
      readTime: "9 min read",
      category: "Training",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

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
            News & Articles
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Training insights, science-backed strategies, and coaching wisdom.
          </p>
        </div>

        {/* News Grid */}
        <div className={`mt-8 grid grid-cols-1 gap-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {newsItems.map((item, idx) => (
            <article
              key={item.id}
              className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm">
                  {item.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-white/70 mb-4 line-clamp-2">
                {item.excerpt}
              </p>
              <button className="flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors">
                <span>Read more</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

