import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { clientEnv } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  
  const routes = [
    "",
    "/programs",
    "/coaching/1on1",
    "/coaching/group",
    "/media",
    "/news",
    "/quiz",
    "/contact",
    "/recommendation",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const programRoutes = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...programRoutes];
}

