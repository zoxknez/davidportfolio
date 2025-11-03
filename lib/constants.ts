/**
 * Application-wide constants
 * Centralized location for all constant values used throughout the application
 */

// =============================================================================
// SITE INFORMATION
// =============================================================================

export const SITE = {
  name: "David Knežević — Fitness Coach",
  shortName: "David Knežević",
  description:
    "Elite coaching, programs, videos, and personalized training plans. Transform your fitness journey with expert guidance.",
  tagline: "Elite coaching. Minimal distractions.",
  author: "David Knežević",
  locale: "en_US",
} as const;

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

export const CONTACT = {
  email: "david@fitnesscoach.com",
  website: "www.davidfitness.com",
} as const;

// =============================================================================
// SOCIAL MEDIA LINKS
// =============================================================================

export const SOCIAL_LINKS = {
  instagram: {
    url: "https://instagram.com/davidfitness",
    handle: "@davidfitness",
    label: "Instagram",
  },
  facebook: {
    url: "https://facebook.com/davidfitness",
    label: "Facebook",
    name: "David Fitness Coach",
  },
  twitter: {
    url: "https://twitter.com/davidfitness",
    handle: "@davidfitness",
    label: "Twitter",
  },
} as const;

// =============================================================================
// NAVIGATION ROUTES
// =============================================================================

export const ROUTES = {
  home: "/",
  programs: "/programs",
  coaching: {
    oneOnOne: "/coaching/1on1",
    group: "/coaching/group",
  },
  media: "/media",
  news: "/news",
  quiz: "/quiz",
  recommendation: "/recommendation",
  contact: "/contact",
  checkout: {
    oneOff: "/checkout/oneoff",
  },
} as const;

// =============================================================================
// SEO & METADATA
// =============================================================================

export const SEO = {
  defaultTitle: SITE.name,
  titleTemplate: "%s | David Knežević",
  defaultDescription: SITE.description,
  keywords: [
    "fitness coach",
    "personal training",
    "workout programs",
    "strength training",
    "fitness coaching",
    "David Knežević",
    "HYROX training",
    "functional bodybuilding",
  ],
  ogImage: {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: SITE.name,
  },
  twitterCard: "summary_large_image",
} as const;

// =============================================================================
// PROGRAM LEVELS
// =============================================================================

export const PROGRAM_LEVELS = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
} as const;

export type ProgramLevel = (typeof PROGRAM_LEVELS)[keyof typeof PROGRAM_LEVELS];

// =============================================================================
// COACHING PACKAGES
// =============================================================================

export const COACHING_PACKAGES = {
  oneOnOne: {
    starter: {
      name: "Starter",
      sessions: 4,
      price: 399,
      duration: "1 month",
    },
    premium: {
      name: "Premium",
      sessions: 8,
      price: 699,
      duration: "1 month",
    },
    elite: {
      name: "Elite",
      sessions: 12,
      price: 999,
      duration: "1 month",
    },
  },
  group: {
    strengthFoundations: {
      name: "Strength Foundations",
      price: 149,
      duration: "per month",
    },
    performanceElite: {
      name: "Performance Elite",
      price: 199,
      duration: "per month",
    },
    functionalMovement: {
      name: "Functional Movement",
      price: 129,
      duration: "per month",
    },
  },
} as const;

// =============================================================================
// QUIZ OPTIONS
// =============================================================================

export const QUIZ = {
  goals: {
    fatLoss: {
      value: "fat-loss",
      label: "Fat Loss",
    },
    muscle: {
      value: "muscle",
      label: "Build Muscle",
    },
    performance: {
      value: "performance",
      label: "Performance",
    },
  },
  daysPerWeek: [2, 3, 4, 5, 6],
  sex: {
    male: {
      value: "male",
      label: "Male",
    },
    female: {
      value: "female",
      label: "Female",
    },
  },
} as const;

// =============================================================================
// FORM VALIDATION LIMITS
// =============================================================================

export const VALIDATION_LIMITS = {
  name: {
    min: 2,
    max: 100,
  },
  email: {
    max: 255,
  },
  message: {
    min: 10,
    max: 2000,
  },
  card: {
    min: 13,
    max: 19,
  },
  cvv: {
    min: 3,
    max: 4,
  },
} as const;

// =============================================================================
// RATE LIMITING
// =============================================================================

export const RATE_LIMITS = {
  // Requests per minute
  contact: 5,
  checkout: 3,
  api: {
    read: 60,
    write: 20,
  },
} as const;

// =============================================================================
// MEDIA & ASSETS
// =============================================================================

export const MEDIA = {
  placeholderImage: "/vercel.svg",
  icons: {
    favicon: "/apple-touch-icon.png",
    appleTouchIcon: "/apple-touch-icon.png",
  },
} as const;

// =============================================================================
// TIMING & INTERVALS (milliseconds)
// =============================================================================

export const TIMING = {
  animationDelay: {
    short: 100,
    medium: 200,
    long: 300,
  },
  transitionDuration: {
    fast: 300,
    normal: 500,
    slow: 700,
  },
  mediaRotation: 8000, // Background video/image rotation
  scrollThreshold: 300, // Pixels scrolled before showing scroll-to-top
} as const;

// =============================================================================
// EXTERNAL SERVICES
// =============================================================================

export const EXTERNAL_SERVICES = {
  vercel: {
    analytics: true,
  },
  sentry: {
    enabled: process.env.NODE_ENV === "production",
  },
} as const;

// =============================================================================
// ACCESSIBILITY
// =============================================================================

export const A11Y = {
  skipLinkId: "main-content",
  skipLinkText: "Skip to main content",
} as const;

