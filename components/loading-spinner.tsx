"use client";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div
          className="absolute inset-0 animate-spin rounded-full border-2 border-white/20 border-t-white"
          style={{ animationDuration: '1s' }}
        />
        {/* Inner ring - slower rotation */}
        <div
          className="absolute inset-[20%] animate-spin rounded-full border-2 border-white/10 border-t-white/50"
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />
        {/* Center dot with pulse */}
        <div className="absolute inset-[40%] rounded-full bg-white/30 animate-pulse" />
      </div>
    </div>
  );
}

