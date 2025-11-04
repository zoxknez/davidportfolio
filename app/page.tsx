import { Hero } from "@/components/hero";
import { BackgroundVideo } from "@/components/background-video";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { Testimonials } from "@/components/testimonials";
import { SuccessStories } from "@/components/success-stories";
import { stats, testimonials, successStories } from "@/data/home-content";
import { Target, Zap, Award, Users, TrendingUp, Heart, Dumbbell, Clock } from "lucide-react";

export default function Home() {
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
      <BackgroundVideo />
      
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
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              What Clients Say
            </h2>
            <p className="text-lg text-white/70">
              Real feedback from real people
            </p>
          </div>
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-16">
            <TrendingUp className="h-16 w-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Take the first step towards your fitness goals. Start with our personalized quiz to find the perfect program for you.
            </p>
            <a
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 bg-white/20 text-white font-semibold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
            >
              Start Your Journey
              <Zap className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
