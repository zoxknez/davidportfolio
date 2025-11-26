"use client";

import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { BackButton } from "@/components/back-button";
import { motion } from "framer-motion";

export default function NewsPage() {
  const mounted = useMounted();

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

  if (!mounted) return null;

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">

      <main className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton />

        {/* Header */}
        <div className="mt-12 sm:mt-16 md:mt-20 mb-12 pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <Sparkles className="h-4 w-4 text-white/80" />
              <span className="text-xs sm:text-sm font-medium text-white/90">
                Latest Insights & Knowledge
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                  News & Articles
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                  Training insights, science-backed strategies, and coaching wisdom to help you on your fitness journey.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
                  <BookOpen className="h-5 w-5 text-white/70 mx-auto mb-1" />
                  <div className="text-xs text-white/60">{newsItems.length} articles</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
                  <TrendingUp className="h-5 w-5 text-white/70 mx-auto mb-1" />
                  <div className="text-xs text-white/60">Popular</div>
                </div>
              </div>
            </div>

            {/* Categories filter - static for now */}
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(newsItems.map(item => item.category))).map((category, idx) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (idx * 0.05) }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:text-white"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* News Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 gap-6 pb-12">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <article className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-1">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base text-white/70 mb-5 line-clamp-2 transition-colors duration-300 group-hover:text-white/80">
                    {item.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-all duration-300 group-hover:text-white group-hover:gap-3">
                    <span>Read full article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 mb-12"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 text-center">
            <BookOpen className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Stay Updated
            </h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Get the latest training tips, nutrition advice, and exclusive content delivered to your inbox.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10"
            >
              Subscribe to Newsletter
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

