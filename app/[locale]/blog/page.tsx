import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Clock, 
  Calendar,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: "Expert fitness tips, nutrition advice, and motivation to help you reach your goals.",
};

// Demo blog posts (will be replaced with DB data)
const demoPosts = [
  {
    id: "1",
    slug: "ultimate-guide-to-muscle-building",
    title: "The Ultimate Guide to Building Muscle in 2024",
    excerpt: "Discover the science-backed strategies for maximizing muscle growth, from training protocols to nutrition timing.",
    thumbnail: "/blog/muscle-building.jpg",
    author: "David Knežević",
    category: "TRAINING_TIPS",
    tags: ["muscle building", "hypertrophy", "strength"],
    publishedAt: new Date("2024-01-15"),
    readTime: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "nutrition-myths-debunked",
    title: "10 Nutrition Myths That Are Holding You Back",
    excerpt: "From meal timing to supplements, we break down the most common nutrition misconceptions in fitness.",
    thumbnail: "/blog/nutrition.jpg",
    author: "David Knežević",
    category: "NUTRITION",
    tags: ["nutrition", "diet", "myths"],
    publishedAt: new Date("2024-01-10"),
    readTime: 6,
    featured: true,
  },
  {
    id: "3",
    slug: "morning-workout-routine",
    title: "The Perfect Morning Workout Routine",
    excerpt: "Start your day right with this energizing morning workout that takes just 30 minutes.",
    thumbnail: "/blog/morning-workout.jpg",
    author: "David Knežević",
    category: "FITNESS",
    tags: ["morning routine", "workout", "productivity"],
    publishedAt: new Date("2024-01-05"),
    readTime: 5,
    featured: false,
  },
  {
    id: "4",
    slug: "mindset-transformation",
    title: "Mindset: The Secret Weapon for Fitness Success",
    excerpt: "Why your mental game matters just as much as your physical training, and how to develop a champion mindset.",
    thumbnail: "/blog/mindset.jpg",
    author: "David Knežević",
    category: "MOTIVATION",
    tags: ["mindset", "motivation", "psychology"],
    publishedAt: new Date("2024-01-01"),
    readTime: 7,
    featured: false,
  },
  {
    id: "5",
    slug: "hiit-vs-steady-state-cardio",
    title: "HIIT vs Steady-State Cardio: Which is Better for Fat Loss?",
    excerpt: "A comprehensive comparison of two popular cardio approaches and when to use each for optimal results.",
    thumbnail: "/blog/cardio.jpg",
    author: "David Knežević",
    category: "FITNESS",
    tags: ["cardio", "fat loss", "HIIT"],
    publishedAt: new Date("2023-12-28"),
    readTime: 6,
    featured: false,
  },
  {
    id: "6",
    slug: "recovery-optimization",
    title: "Recovery 101: How to Maximize Your Rest Days",
    excerpt: "Learn the science of recovery and how to optimize your rest days for better performance and growth.",
    thumbnail: "/blog/recovery.jpg",
    author: "David Knežević",
    category: "LIFESTYLE",
    tags: ["recovery", "rest", "sleep"],
    publishedAt: new Date("2023-12-20"),
    readTime: 5,
    featured: false,
  },
];

const categories = [
  { name: "All", value: "all" },
  { name: "Fitness", value: "FITNESS" },
  { name: "Nutrition", value: "NUTRITION" },
  { name: "Motivation", value: "MOTIVATION" },
  { name: "Lifestyle", value: "LIFESTYLE" },
  { name: "Training Tips", value: "TRAINING_TIPS" },
];

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    FITNESS: "bg-blue-500/20 text-blue-400",
    NUTRITION: "bg-green-500/20 text-green-400",
    MOTIVATION: "bg-purple-500/20 text-purple-400",
    LIFESTYLE: "bg-orange-500/20 text-orange-400",
    TRAINING_TIPS: "bg-cyan-500/20 text-cyan-400",
    SUCCESS_STORIES: "bg-yellow-500/20 text-yellow-400",
  };
  return colors[category] || "bg-white/20 text-white/80";
}

export default async function BlogPage() {
  // In production, fetch from database:
  // const posts = await prisma.blogPost.findMany({
  //   where: { published: true },
  //   orderBy: { publishedAt: "desc" },
  // });
  
  const posts = demoPosts;
  const featuredPosts = posts.filter((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured);

  // JSON-LD structured data for the blog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Elite Fitness Blog",
    description: "Expert fitness tips, nutrition advice, and motivation to help you reach your goals.",
    url: `${SITE.url}/blog`,
    author: {
      "@type": "Person",
      name: SITE.author,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      datePublished: post.publishedAt.toISOString(),
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: post.thumbnail ? `${SITE.url}${post.thumbnail}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Fitness Blog
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Expert advice, training tips, and motivation to fuel your fitness journey
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant="ghost"
              size="sm"
              className={`rounded-full ${
                category.value === "all"
                  ? "bg-white text-black hover:bg-white/90"
                  : "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden rounded-2xl glass-card"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={post.thumbnail || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)} mb-3`}>
                      {post.category.replace("_", " ")}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(post.publishedAt, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group glass-card rounded-xl overflow-hidden hover:bg-white/15 transition-colors"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={post.thumbnail || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(post.category)} mb-3`}>
                    {post.category.replace("_", " ")}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/60 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(post.publishedAt, "MMM d")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 glass-card rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Never Miss an Article
          </h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter and get the latest fitness tips, workout routines, 
            and nutrition advice delivered straight to your inbox.
          </p>
          <NewsletterForm source="blog" className="max-w-md mx-auto" />
        </section>
        </div>
      </div>
    </>
  );
}
