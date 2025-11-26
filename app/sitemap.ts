import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { clientEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  
  // Main static routes
  const mainRoutes = [
    { path: "", priority: 1, changeFreq: "weekly" as const },
    { path: "/programs", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/about", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/coaching/1on1", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/coaching/group", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/media", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "daily" as const },
    { path: "/news", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/quiz", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/recommendation", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/faq", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));

  // Program detail pages
  const programRoutes = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Auth pages (lower priority, but needed for SEO)
  const authRoutes = [
    { path: "/auth/login", priority: 0.4 },
    { path: "/auth/register", priority: 0.4 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  return [...mainRoutes, ...programRoutes, ...authRoutes];
}

