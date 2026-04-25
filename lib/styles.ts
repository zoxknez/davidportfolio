/**
 * Shared style constants for consistent UI across the application
 */

export const buttonStyles = {
  primary: "h-12 rounded-lg border border-white/10 bg-white/[0.06] px-6 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[oklch(0.79_0.16_170_/_0.45)] hover:bg-white/[0.1] hover:text-white sm:px-8 sm:text-base",
  secondary: "h-11 rounded-lg border border-white/10 bg-white/[0.06] px-4 text-xs font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[oklch(0.79_0.16_170_/_0.45)] hover:bg-white/[0.1] hover:text-white sm:px-6 sm:text-sm",
  small: "h-9 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-xs font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-[oklch(0.79_0.16_170_/_0.45)] hover:bg-white/[0.1] hover:text-white sm:h-10 sm:px-4 sm:text-sm",
} as const;

export const inputStyles = {
  base: "w-full rounded-lg border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm",
  default: "border-white/20 bg-white/[0.06] focus:border-[oklch(0.79_0.16_170_/_0.65)] focus:bg-white/[0.1]",
  error: "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15",
} as const;

export const cardStyles = {
  base: "glass-card",
  hover: "glass-card-hover",
} as const;

