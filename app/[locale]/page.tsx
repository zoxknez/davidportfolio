"use client";

import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { Testimonials } from "@/components/testimonials";
import { SuccessStories } from "@/components/success-stories";
import { CtaSection } from "@/components/cta-section";
import { stats, testimonials, successStories } from "@/data/home-content";
import { Target, Award, Users, Heart, Dumbbell, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      icon: Target,
      title: "Goal-Oriented Training",
      description: "Every program is designed with your specific goals in mind, ensuring maximum efficiency and results.",
    },
    {
      icon: Dumbbell,
      title: "Progressive Overload",
      description: "Scientifically-backed progression systems that guarantee continuous improvement and strength gains.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a thriving community of like-minded individuals on their fitness journey.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Programs that adapt to your lifestyle, whether you train 3 or 6 days a week.",
    },
    {
      icon: Heart,
      title: "Holistic Approach",
      description: "We focus on nutrition, recovery, and mental health alongside physical training.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Track record of transforming hundreds of clients from beginners to athletes.",
    },
  ];

  return (
    <div className="min-h-dvh font-sans text-white">
      <div className="relative border-b border-white/12">
        <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8">
          <Hero />
        </main>
      </div>

      <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <StatsSection
            stats={stats}
            title="Proof you can scan in seconds"
            subtitle="A coaching system should show outcomes clearly: people helped, standards kept, and the discipline behind each transformation."
          />
        </div>
      </section>

      <section className="relative border-y border-white/12 bg-white/[0.03] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <FeaturesSection
            features={features}
            title="A stronger system than motivation"
            subtitle="Every touchpoint is built around clarity: exact goals, repeatable training blocks, visible progress, and enough accountability to keep going."
            columns={3}
          />
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SuccessStories
            stories={successStories}
            title="Transformations with a timeline"
            subtitle="The story matters, but the numbers keep it honest."
          />
        </div>
      </section>

      <section className="relative border-y border-white/12 bg-white/[0.03] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Testimonials
            testimonials={testimonials}
            title={t("testimonials.title")}
            subtitle={t("testimonials.subtitle")}
          />
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <CtaSection />
      </section>
    </div>
  );
}
