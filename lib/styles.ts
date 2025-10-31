/**
 * Shared style constants for consistent UI across the application
 */

export const buttonStyles = {
  primary: "h-12 rounded-full border border-white/10 bg-white/5 px-6 sm:px-8 text-sm sm:text-base text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10",
  secondary: "h-11 rounded-full border border-white/10 bg-white/5 px-4 sm:px-6 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10",
  small: "h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10",
} as const;

export const inputStyles = {
  base: "w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm",
  default: "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10",
  error: "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15",
} as const;

export const cardStyles = {
  base: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
  hover: "transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10",
} as const;

