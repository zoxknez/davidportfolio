"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Program } from "@/data/programs";
import { ProgramCard } from "@/components/program-card";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramFinderProps {
  programs: Program[];
}

export function ProgramFinder({ programs }: ProgramFinderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique values for filters
  const levels = useMemo(() => Array.from(new Set(programs.map((p) => p.level))), [programs]);
  const goals = useMemo(() => Array.from(new Set(programs.map((p) => p.goal))), [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            program.goal.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel ? program.level === selectedLevel : true;
      const matchesGoal = selectedGoal ? program.goal === selectedGoal : true;

      return matchesSearch && matchesLevel && matchesGoal;
    });
  }, [programs, searchQuery, selectedLevel, selectedGoal]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLevel(null);
    setSelectedGoal(null);
  };

  const hasActiveFilters = searchQuery || selectedLevel || selectedGoal;

  return (
    <div className="w-full space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "w-full sm:w-auto h-12 gap-2 border border-white/10 bg-white/5 hover:bg-white/10",
              isFilterOpen && "bg-white/10 border-white/30"
            )}
          >
            <Filter className="h-4 w-4" />
            Filters
            {(selectedLevel || selectedGoal) && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {(selectedLevel ? 1 : 0) + (selectedGoal ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                {/* Level Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/70">Difficulty Level</label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                          selectedLevel === level
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/70">Goal</label>
                  <div className="flex flex-wrap gap-2">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(selectedGoal === goal ? null : goal)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                          selectedGoal === goal
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                        )}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="pt-2 border-t border-white/10 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-white/50 hover:text-white hover:bg-white/5 gap-2"
                    >
                      <X className="h-3 w-3" />
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <motion.div
                key={program.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search className="h-8 w-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No programs found</h3>
              <p className="text-white/50 max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="mt-4 text-white hover:text-white/80"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
