"use client";

import { memo } from "react";

function QuizProgressComponent({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between text-xs text-white/60">
        <span>Step {current} of {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5 backdrop-blur-sm">
        <div 
          className="h-full rounded-full bg-white/20 transition-all duration-500 ease-out backdrop-blur-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export const QuizProgress = memo(QuizProgressComponent);
QuizProgress.displayName = "QuizProgress";

