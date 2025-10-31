import type { Metadata } from "next";
import { programs } from "@/data/programs";
import { clientEnv } from "@/lib/env";
import ProgramsClient from "./programs-client";

export const metadata: Metadata = {
  title: "Programs",
  description: `Browse our ${programs.length} fitness programs designed for all levels. From beginner to advanced, find the perfect training program for your goals.`,
  keywords: ["fitness programs", "workout plans", "training programs", "David Knežević"],
  openGraph: {
    title: "Training Programs | David Knežević",
    description: `Browse our ${programs.length} fitness programs designed for all levels.`,
    url: `${clientEnv.NEXT_PUBLIC_SITE_URL}/programs`,
    siteName: "David Knežević — Fitness Coach",
  },
  twitter: {
    card: "summary_large_image",
    title: "Training Programs | David Knežević",
    description: `Browse our ${programs.length} fitness programs designed for all levels.`,
  },
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_SITE_URL}/programs`,
  },
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}
