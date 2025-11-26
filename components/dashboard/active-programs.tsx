"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, CheckCircle } from "lucide-react";

interface Program {
  id: string;
  program: {
    id: string;
    name: string;
    duration: string;
    thumbnail: string | null;
    totalWorkouts: number;
  };
  currentWeek: number;
  currentDay: number;
  startedAt: Date;
  completedAt: Date | null;
  workouts: Array<{
    id: string;
    completedAt: Date;
  }>;
}

interface ActiveProgramsProps {
  programs: Program[];
}

export function ActivePrograms({ programs }: ActiveProgramsProps) {
  const activePrograms = programs.filter((p) => !p.completedAt);

  if (activePrograms.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Active Programs</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-white/40" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No active programs
          </h3>
          <p className="text-white/60 mb-4">
            Start a program to begin your fitness journey
          </p>
          <Button asChild>
            <Link href="/programs">Browse Programs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Active Programs</h2>
        <Link
          href="/dashboard/programs"
          className="text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {activePrograms.map((item, index) => {
          const progress =
            item.program.totalWorkouts > 0
              ? (item.workouts.length / item.program.totalWorkouts) * 100
              : 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                {item.program.thumbnail ? (
                  <img
                    src={item.program.thumbnail}
                    alt={item.program.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Play className="h-6 w-6 text-white/40" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">
                  {item.program.name}
                </h3>
                <p className="text-sm text-white/60">
                  Week {item.currentWeek}, Day {item.currentDay}
                </p>

                {/* Progress bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-white/50 w-12 text-right">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Action */}
              <Button
                size="sm"
                className="shrink-0 bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href={`/dashboard/programs/${item.program.id}`}>
                  Continue
                </Link>
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Completed programs preview */}
      {programs.filter((p) => p.completedAt).length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              {programs.filter((p) => p.completedAt).length} program(s) completed
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
