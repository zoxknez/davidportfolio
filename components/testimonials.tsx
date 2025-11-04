"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
}

export function Testimonials({
  testimonials,
  autoplay = true,
  interval = 5000,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full">
      {/* Main testimonial card */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500">
        {/* Quote icon */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-20">
          <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
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
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={goToPrev}
            disabled={isAnimating}
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
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
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
            disabled={isAnimating}
            className="group rounded-full border border-white/10 bg-white/5 p-2 sm:p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-white/80 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

