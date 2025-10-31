"use client";

import { memo, useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Users } from "lucide-react";
import { buttonStyles } from "@/lib/styles";

function TrainingDropdownComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`${buttonStyles.primary} flex items-center gap-2`}
      >
        Training
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 shadow-lg shadow-black/20 z-50 animate-fade-in">
          <Link
            href="/coaching/1on1"
            onClick={closeDropdown}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10 mb-2"
            aria-label="1-on-1 Coaching - Personalized training"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-2" aria-hidden="true">
              <User className="h-4 w-4 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">1-on-1 Coaching</div>
              <div className="text-xs text-white/60">Personalized training</div>
            </div>
          </Link>
          <Link
            href="/coaching/group"
            onClick={closeDropdown}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            aria-label="Group Coaching - Train together"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-2" aria-hidden="true">
              <Users className="h-4 w-4 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">Group Coaching</div>
              <div className="text-xs text-white/60">Train together</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export const TrainingDropdown = memo(TrainingDropdownComponent);
TrainingDropdown.displayName = "TrainingDropdown";

