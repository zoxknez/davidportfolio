import type { Metadata } from "next";
import { Suspense } from "react";
import { getProgram, programs } from "@/data/programs";
import { clientEnv } from "@/lib/env";
import ProgramDetailClient from "./program-detail-client";

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);

  if (!program) {
    return {
      title: "Program Not Found",
    };
  }

  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  const url = `${baseUrl}/programs/${slug}`;
  const imageUrl = program.image;

  return {
    title: program.title,
    description: `${program.goal}. ${program.level} level program - ${program.weeks} weeks, ${program.daysPerWeek} days per week.`,
    keywords: [
      program.title.toLowerCase(),
      program.level,
      "fitness program",
      "workout",
      "training",
      "David Knežević",
    ],
    openGraph: {
      title: program.title,
      description: `${program.goal}. ${program.level} level program.`,
      url,
      siteName: "David Knežević — Fitness Coach",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: program.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: program.title,
      description: `${program.goal}. ${program.level} level program.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden bg-black">
      <Suspense fallback={
        <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10 flex items-center justify-center min-h-dvh">
          <div className="text-white/70">Loading...</div>
        </main>
      }>
        <ProgramDetailClient paramsPromise={params} />
      </Suspense>
    </div>
  );
}
