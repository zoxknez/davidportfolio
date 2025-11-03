/**
 * Web Vitals tracking utilities
 * Monitors Core Web Vitals and custom performance metrics
 */

import type { WebVitalsMetric } from "@/types";

/**
 * Report Web Vitals to analytics service
 * Can be integrated with Google Analytics, Vercel Analytics, or custom service
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 Web Vital [${metric.name}]:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to Google Analytics (if configured)
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as any).gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (typeof window !== "undefined" && "va" in window) {
    (window as any).va("event", {
      name: `web_vital_${metric.name.toLowerCase()}`,
      data: {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      },
    });
  }

  // Send to custom analytics endpoint (optional)
  if (process.env.NODE_ENV === "production") {
    // Uncomment and configure your custom analytics endpoint
    // fetch("/api/analytics/web-vitals", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     metric: metric.name,
    //     value: metric.value,
    //     rating: metric.rating,
    //     id: metric.id,
    //     timestamp: new Date().toISOString(),
    //   }),
    // }).catch((error) => {
    //   console.error("Failed to report web vital:", error);
    // });
  }
}

/**
 * Thresholds for Web Vitals ratings
 * Based on Google's recommendations
 */
export const WEB_VITALS_THRESHOLDS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500, // ms
    needsImprovement: 4000, // ms
  },
  // First Input Delay (FID)
  FID: {
    good: 100, // ms
    needsImprovement: 300, // ms
  },
  // Interaction to Next Paint (INP)
  INP: {
    good: 200, // ms
    needsImprovement: 500, // ms
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800, // ms
    needsImprovement: 3000, // ms
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800, // ms
    needsImprovement: 1800, // ms
  },
} as const;

/**
 * Calculate rating based on metric value and thresholds
 */
export function calculateRating(
  metricName: WebVitalsMetric["name"],
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];

  if (!thresholds) {
    return "good";
  }

  if (value <= thresholds.good) {
    return "good";
  }

  if (value <= thresholds.needsImprovement) {
    return "needs-improvement";
  }

  return "poor";
}

/**
 * Format metric value for display
 */
export function formatMetricValue(metric: WebVitalsMetric): string {
  switch (metric.name) {
    case "CLS":
      return metric.value.toFixed(3);
    case "FCP":
    case "FID":
    case "LCP":
    case "TTFB":
    case "INP":
      return `${Math.round(metric.value)}ms`;
    default:
      return metric.value.toString();
  }
}

/**
 * Get emoji indicator based on rating
 */
export function getRatingEmoji(rating: WebVitalsMetric["rating"]): string {
  switch (rating) {
    case "good":
      return "✅";
    case "needs-improvement":
      return "⚠️";
    case "poor":
      return "❌";
    default:
      return "❓";
  }
}

