/**
 * Centralized type definitions for the application
 * Provides type safety and autocompletion across the codebase
 */

import { PROGRAM_LEVELS } from "@/lib/constants";

// =============================================================================
// PROGRAM TYPES
// =============================================================================

export type ProgramLevel = "beginner" | "intermediate" | "advanced";

export type Program = {
  slug: string;
  title: string;
  goal: string;
  level: ProgramLevel;
  weeks: number;
  daysPerWeek: number;
  trailer?: string;
  image: string;
  gallery?: string[];
  equipment: string[];
  syllabus: string[];
  priceOneOff: number;
  includedIn?: string[];
};

// =============================================================================
// MEDIA TYPES
// =============================================================================

export type ImageMedia = {
  kind: "image";
  src: string;
  alt?: string;
};

export type VideoMedia = {
  kind: "video";
  src: string;
  poster?: string;
  alt?: string;
};

export type Media = ImageMedia | VideoMedia;

// =============================================================================
// FORM TYPES
// =============================================================================

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type CheckoutFormData = {
  name: string;
  email: string;
  card: string;
  expiry: string;
  cvv: string;
};

export type QuizFormData = {
  goal: "fat-loss" | "muscle" | "performance";
  days: number;
  sex: "male" | "female";
};

// =============================================================================
// COACHING TYPES
// =============================================================================

export type CoachingPackageType = "starter" | "premium" | "elite";

export type CoachingPackage = {
  name: string;
  sessions: number;
  price: number;
  duration: string;
  features: string[];
};

export type GroupCoachingClass = {
  name: string;
  schedule: string;
  size: string;
  price: number;
  duration: string;
  description: string;
  level: string;
};

// =============================================================================
// NEWS & BLOG TYPES
// =============================================================================

export type NewsCategory =
  | "Training"
  | "Science"
  | "Nutrition"
  | "Mindset"
  | "Recovery";

export type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: NewsCategory;
  slug?: string;
  content?: string;
  author?: string;
  image?: string;
};

// =============================================================================
// UI COMPONENT TYPES
// =============================================================================

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "glass";

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

export type LoadingSpinnerSize = "sm" | "md" | "lg";

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type DropdownNavItem = {
  label: string;
  items: NavItem[];
};

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export type ApiResponse<T = unknown> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      message?: string;
    };

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

// =============================================================================
// ERROR TYPES
// =============================================================================

export type AppError = {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
};

export type ValidationError = {
  field: string;
  message: string;
};

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Make specific properties of T required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties of T optional
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extract the type of an array element
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Make all properties nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// =============================================================================
// METADATA TYPES (for Next.js)
// =============================================================================

export type PageParams<T extends Record<string, string> = Record<string, string>> = {
  params: Promise<T>;
};

export type PageSearchParams = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export type PageProps<
  T extends Record<string, string> = Record<string, string>,
> = PageParams<T> & PageSearchParams;

// =============================================================================
// RATE LIMITING TYPES
// =============================================================================

export type RateLimitResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
      retryAfter: number;
    };

// =============================================================================
// SENTRY TYPES
// =============================================================================

export type SentryConfig = {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
  enabled: boolean;
};

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: Date;
};

export type WebVitalsMetric = {
  id: string;
  name: "FCP" | "LCP" | "CLS" | "FID" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
};

