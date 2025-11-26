"use client";

import { useState, useEffect } from "react";
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

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, currentIndex]);

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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Main testimonial card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 overflow-hidden"
      >
        {/* Quote icon */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-20">
          <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-base sm:text-lg text-white/90 leading-relaxed italic">
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4">
                {currentTestimonial.image && (
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
                    {currentTestimonial.role}
                  </div>
                </div>
              </div>

              {/* Rating */}
              {currentTestimonial.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating!
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/20 fill-white/20"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={goToPrev}
            className="group rounded-full border border-white/10 bg-white/5 p-2 sm:p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-white/80 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-white/80"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group rounded-full border border-white/10 bg-white/5 p-2 sm:p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

