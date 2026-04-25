"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image?: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  title?: string;
  subtitle?: string;
}

export function Testimonials({
  testimonials,
  autoplay = true,
  interval = 5000,
  title,
  subtitle,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) {
    return null;
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full">
      {(title || subtitle) && (
        <motion.div 
          className="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="section-kicker">Client voice</div>
            {title && (
              <h2 className="section-title">
                {title}
              </h2>
            )}
          </div>
          {subtitle && (
            <p className="section-copy lg:justify-self-end">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="tactical-card p-8 transition-all duration-500 sm:p-12"
        style={{ "--glass-accent": "oklch(0.72 0.18 258)" } as CSSProperties}
      >
        <div className="absolute right-6 top-6 opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.12]">
          <Quote className="h-24 w-24 rotate-180 text-white sm:h-32 sm:w-32" />
        </div>

        <div className="relative z-10 flex min-h-[240px] flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="space-y-7"
            >
              <p className="max-w-3xl text-pretty text-xl font-semibold leading-[1.6] text-white sm:text-3xl sm:leading-[1.4]">
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-5">
                {currentTestimonial.image && (
                  <div className="h-14 w-14 overflow-hidden rounded-xl border-2 border-white/25 bg-white/10 shadow-lg sm:h-16 sm:w-16">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="text-base font-bold text-white sm:text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-sm text-white/65 sm:text-base">
                    {currentTestimonial.role}
                  </div>
                </div>
              </div>

              {currentTestimonial.rating && (
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className={`h-6 w-6 transition-all duration-300 ${
                        i < currentTestimonial.rating!
                          ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_8px_rgba(250,204,21,0.4)]"
                          : "text-white/20 fill-white/20"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </motion.svg>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/12 pt-7">
          <motion.button
            onClick={goToPrev}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group rounded-xl border border-white/15 bg-white/[0.08] p-3 shadow-lg transition-all duration-300 hover:border-white/25 hover:bg-white/[0.14] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:p-3.5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-white/85 transition-transform group-hover:-translate-x-1" />
          </motion.button>

          <div className="flex gap-2.5">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2.5 rounded-full transition-all duration-400 ${
                  index === currentIndex
                    ? "w-10 bg-[oklch(0.79_0.16_170)] shadow-lg shadow-[oklch(0.79_0.16_170_/_0.4)]"
                    : "w-2.5 bg-white/35 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={goToNext}
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="group rounded-xl border border-white/15 bg-white/[0.08] p-3 shadow-lg transition-all duration-300 hover:border-white/25 hover:bg-white/[0.14] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:p-3.5"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-white/85 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

