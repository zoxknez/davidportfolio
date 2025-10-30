"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Users } from "lucide-react";

export function TrainingDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10 flex items-center gap-2"
      >
        Training
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 shadow-lg shadow-black/20 z-50 animate-fade-in">
          <a
            href="/coaching/1on1"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10 mb-2"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <User className="h-4 w-4 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">1-on-1 Coaching</div>
              <div className="text-xs text-white/60">Personalized training</div>
            </div>
          </a>
          <a
            href="/coaching/group"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <Users className="h-4 w-4 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Group Coaching</div>
              <div className="text-xs text-white/60">Train together</div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

