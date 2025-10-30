"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="ghost"
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10 z-50 text-sm sm:text-base"
      aria-label="Scroll to top"
    >
      ↑
    </Button>
  );
}

