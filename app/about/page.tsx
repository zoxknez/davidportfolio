import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Users, 
  Target, 
  Heart, 
  Award,
  CheckCircle,
  ArrowRight,
  Quote,
  MapPin,
  Dumbbell,
  Sparkles,
} from "lucide-react";
import { SITE, SOCIAL_LINKS, CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About David Knežević | From Serbia to Dubai",
  description: "The incredible journey from a small Serbian village to Dubai's elite fitness scene. Learn about David Knežević's story of consistency, discipline, and success.",
  openGraph: {
    title: "About David Knežević | Elite Fitness Coach",
    description: "From struggle to global fame. Discover the story behind one of Dubai's most sought-after fitness coaches.",
  },
};

const milestones = [
  { 
    year: "Early Life", 
    title: "Small Village Beginnings", 
    description: "Growing up in a small Serbian village, David saw a life of routine around him. But even as a child, he knew something bigger was waiting beyond the borders of his community. Sports played a major role — football, running, and different physical activities shaped his discipline.",
    icon: MapPin,
  },
  { 
    year: "University", 
    title: "Novi Sad — The First Step", 
    description: "Moving to Novi Sad for university opened his mind and helped him grow quickly. He started filming workouts, taking on clients, and slowly entering the world of coaching. What started as a passion became the first step toward a professional path.",
    icon: Target,
  },
  { 
    year: "First Job", 
    title: "Invictus Training Center", 
    description: "His close friend Nedeljko Rodić offered him a chance when he had little experience. This opportunity was crucial — it helped him build confidence and learn what it meant to work professionally with clients.",
    icon: Dumbbell,
  },
  { 
    year: "Breakthrough", 
    title: "Profitnes Gym — Novi Sad", 
    description: "At one of the most popular fitness centers in Novi Sad, David built a strong personal brand and entered the world of social media. Despite financial struggles — sometimes not being able to afford simple things like ten eggs — he refused to let anyone see his problems. Every day, he walked into the gym with a smile.",
    icon: Trophy,
  },
  { 
    year: "Age 22", 
    title: "Financial Independence", 
    description: "Through dedication and patience, David became one of the most sought-after trainers. His name became associated with discipline, results, and professionalism. He achieved financial independence at just 22 years old.",
    icon: Award,
  },
  { 
    year: "Today", 
    title: "Dubai — Global Success", 
    description: "Dubai's competitive fitness industry proved to be the right move. Today, David is recognized in both Serbia and Dubai for his quality of work, dedication, and influence in the fitness community. He's not just a coach — he's a mentor and a real example for anyone who wants to change their life.",
    icon: Sparkles,
  },
];

const values = [
  {
    icon: Target,
    title: "Consistency Over Talent",
    description: "David believes that talent can help, but it's not the key to success. What truly matters is showing up every single day, even when life is difficult.",
  },
  {
    icon: Heart,
    title: "Passion & Discipline",
    description: "Fitness isn't just a profession — it's a lifestyle built on discipline and genuine passion for helping others transform.",
  },
  {
    icon: Users,
    title: "Building Relationships",
    description: "Success isn't just about personal achievement. It's about the connections you make and investing in others along the way.",
  },
  {
    icon: Award,
    title: "Giving Back",
    description: "David wants to inspire people from small places or limited circumstances. Your background doesn't define your future.",
  },
];

const certifications = [
  "Certified Personal Trainer",
  "Sports Nutrition Specialist",
  "Strength & Conditioning Coach",
  "Functional Movement Specialist",
  "Online Coaching Professional",
  "Body Transformation Expert",
];

export default function AboutPage() {
  // JSON-LD structured data for David's profile
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Knežević",
    jobTitle: "Elite Fitness Coach",
    description: "Professional fitness coach and mentor based in Dubai, originally from Serbia. Known for his journey from a small village to international success.",
    url: SITE.url,
    image: `${SITE.url}/david-about.jpg`,
    sameAs: [
      SOCIAL_LINKS.instagram.url,
      SOCIAL_LINKS.threads.url,
      SOCIAL_LINKS.youtube.url,
    ],
    worksFor: {
      "@type": "Organization",
      name: "David Knežević Fitness",
      location: {
        "@type": "Place",
        name: CONTACT.location,
      },
    },
    nationality: {
      "@type": "Country",
      name: "Serbia",
    },
    knowsAbout: [
      "Fitness Training",
      "Personal Coaching",
      "Body Transformation",
      "Strength Training",
      "Nutrition",
      "Mindset Coaching",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Elite Fitness Coach</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Hi, I&apos;m <span className="text-gradient">David Knežević</span>
              </h1>
              
              <p className="text-lg text-white/70 mb-4 leading-relaxed">
                From a small Serbian village to Dubai&apos;s elite fitness scene — my journey is proof that 
                your background doesn&apos;t define your future. Through discipline, consistency, and an 
                unwavering belief in the process, I&apos;ve built a career helping others transform their 
                bodies and minds.
              </p>
              
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                At 22, I became financially independent. Today, I&apos;m recognized in both Serbia and Dubai 
                for my coaching quality and dedication. My mission? To inspire and guide those who, like me, 
                started with nothing but a dream.
              </p>
              
              <div className="flex items-center gap-2 text-white/60 mb-6">
                <MapPin className="h-5 w-5" />
                <span>Dubai, UAE • Originally from Serbia</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 group"
                  asChild
                >
                  <Link href="/quiz">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/david-about.jpg"
                  alt="David Knežević"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-xs text-white/60">Clients</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">22</p>
                    <p className="text-xs text-white/60">Age Independent</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">2</p>
                    <p className="text-xs text-white/60">Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Journey</h2>
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 h-8 w-8 text-white/20" />
              <p className="text-lg text-white/70 leading-relaxed italic">
                &quot;Your background does not define your future. With discipline and consistency, 
                anyone can create a life they once believed was out of reach. I succeeded not because 
                I had the most resources, but because I refused to quit.&quot;
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform lg:-translate-x-0.5" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-16 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <span className="text-sm font-medium text-white/50">{milestone.year}</span>
                    <h3 className="text-xl font-semibold text-white mt-1">{milestone.title}</h3>
                    <p className="text-white/60 mt-2 leading-relaxed">{milestone.description}</p>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-4 lg:left-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transform -translate-x-1/2 z-10">
                    <milestone.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Core Values</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              These principles guide every aspect of my coaching philosophy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass-card rounded-xl p-6 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Credentials & Certifications
              </h2>
              <p className="text-lg text-white/70 mb-8">
                I believe in continuous education and staying at the forefront of fitness science. 
                Here are some of my professional qualifications:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
                    <span className="text-white/80">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-6">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Elite Certified Coach</h3>
                <p className="text-white/60 mb-6">
                  Recognized among the top 1% of online fitness professionals
                </p>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">15+</p>
                    <p className="text-sm text-white/50">Certifications</p>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">500+</p>
                    <p className="text-sm text-white/50">Training Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re just starting out or looking to take your fitness to the next level, 
            I&apos;m here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 group"
              asChild
            >
              <Link href="/quiz">
                Find Your Perfect Program
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/coaching/1on1">Explore 1-on-1 Coaching</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
