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
    <div className="min-h-dvh font-sans text-zinc-900 dark:text-zinc-50">
      
      {/* Hero Section */}
      <div className="relative">
        <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-8 px-6 py-12">
          <Hero />
        </main>
      </div>

      {/* Stats Section */}
      <section className="relative py-20 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <StatsSection stats={stats} />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <FeaturesSection
            features={features}
            title="Why Choose Elite Coaching"
            subtitle="Everything you need to achieve your fitness goals"
            columns={3}
          />
        </div>
      </section>

      {/* Success Stories */}
      <section className="relative py-20 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <SuccessStories stories={successStories} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <Testimonials 
            testimonials={testimonials} 
            title={t("testimonials.title")}
            subtitle={t("testimonials.subtitle")}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-32 px-6">
        <CtaSection />
      </section>
    </div>
  );
}
