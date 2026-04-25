"use client";

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring with gradient */}
        <div
          className="absolute inset-0 animate-spin rounded-full border-[3px] border-white/15 border-t-[oklch(0.79_0.16_170)] border-r-[oklch(0.66_0.22_31)] shadow-lg shadow-[oklch(0.79_0.16_170_/_0.2)]"
          style={{ animationDuration: '0.8s' }}
        />
        {/* Inner ring - slower rotation */}
        <div
          className="absolute inset-[20%] animate-spin rounded-full border-2 border-white/10 border-t-[oklch(0.86_0.18_112_/_0.8)]"
          style={{ animationDuration: '1.2s', animationDirection: 'reverse' }}
        />
        {/* Center dot with pulse and glow */}
        <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-[oklch(0.79_0.16_170)] to-[oklch(0.66_0.22_31)] animate-pulse shadow-lg shadow-[oklch(0.79_0.16_170_/_0.4)]" />
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[oklch(0.79_0.16_170_/_0.1)] to-[oklch(0.66_0.22_31_/_0.1)] blur-md animate-pulse" />
      </div>
    </div>
  );
}

