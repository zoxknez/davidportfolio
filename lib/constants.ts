/**
 * Application-wide constants
 * Centralized location for all constant values used throughout the application
 */

// =============================================================================
// SITE INFORMATION
// =============================================================================

export const SITE = {
  name: "David Knežević — Elite Fitness Coach",
  shortName: "David Knežević",
  description:
    "From a small Serbian village to Dubai's elite fitness scene. Transform your body and mindset with David Knežević — certified coach, mentor, and living proof that consistency beats talent.",
  tagline: "Consistency Over Talent. Transform Your Life.",
  author: "David Knežević",
  locale: "en_US",
  url: "https://www.davidfitness.com",
  origin: "Serbia",
  currentLocation: "Dubai, UAE",
} as const;

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

export const CONTACT = {
  email: "david@fitnesscoach.com",
  website: "www.davidfitness.com",
  location: "Dubai, United Arab Emirates",
  originCity: "Novi Sad, Serbia",
} as const;

// =============================================================================
// SOCIAL MEDIA LINKS
// =============================================================================

export const SOCIAL_LINKS = {
  instagram: {
    url: "https://instagram.com/knezeviicdavid",
    handle: "@knezeviicdavid",
    label: "Instagram",
  },
  threads: {
    url: "https://threads.com/@knezeviicdavid",
    handle: "@knezeviicdavid",
    label: "Threads",
  },
  facebook: {
    url: "https://facebook.com/knezeviicdavid",
    label: "Facebook",
    name: "David Knežević",
  },
  youtube: {
    url: "https://youtube.com/@knezeviicdavid",
    handle: "@knezeviicdavid",
    label: "YouTube",
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
    "fitness coach Dubai",
    "personal training UAE",
    "Serbian fitness coach",
    "David Knežević",
    "online coaching",
    "body transformation",
    "elite fitness training",
    "Dubai personal trainer",
    "fitness mentor",
    "strength training Dubai",
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

