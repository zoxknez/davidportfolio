import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  AtSign, 
  Facebook, 
  Linkedin,
  User,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

// Demo blog posts (same as list page)
const demoPosts = [
  {
    id: "1",
    slug: "ultimate-guide-to-muscle-building",
    title: "The Ultimate Guide to Building Muscle in 2024",
    excerpt: "Discover the science-backed strategies for maximizing muscle growth, from training protocols to nutrition timing.",
    content: `
# The Ultimate Guide to Building Muscle in 2024

Building muscle is both an art and a science. In this comprehensive guide, we'll break down everything you need to know about maximizing your muscle-building potential.

## Understanding Muscle Growth

Muscle hypertrophy occurs when muscle fibers are damaged through resistance training and then repair themselves to become larger and stronger. This process requires three key elements:

1. **Progressive Overload** - Gradually increasing the demands on your muscles
2. **Adequate Nutrition** - Providing the building blocks for muscle growth
3. **Sufficient Recovery** - Allowing time for repair and adaptation

## Training for Maximum Gains

### Rep Ranges

For hypertrophy, focus on:
- **6-12 reps** for compound movements
- **8-15 reps** for isolation exercises
- **3-4 sets** per exercise

### Exercise Selection

Include these essential movements:
- Squats and deadlifts
- Bench press and overhead press
- Rows and pull-ups
- Isolation work for lagging muscle groups

## Nutrition Fundamentals

### Protein Intake

Aim for **1.6-2.2g of protein per kg of body weight** daily. Distribute this across 4-5 meals for optimal muscle protein synthesis.

### Caloric Surplus

To build muscle efficiently, consume **200-500 calories above maintenance**. This provides the energy needed for growth while minimizing fat gain.

## Recovery Strategies

- Get 7-9 hours of quality sleep
- Manage stress through meditation or light activity
- Take rest days between training the same muscle groups
- Consider active recovery like walking or yoga

## Common Mistakes to Avoid

1. Not eating enough
2. Training too frequently without adequate rest
3. Ignoring progressive overload
4. Skipping compound movements

## Conclusion

Building muscle is a long-term journey that requires consistency in training, nutrition, and recovery. Focus on the fundamentals, stay patient, and the results will come.

Ready to start your muscle-building journey? Check out our [Hypertrophy Program](/programs) designed specifically for maximum muscle growth.
    `,
    thumbnail: "/blog/muscle-building.jpg",
    author: "David Knežević",
    category: "TRAINING_TIPS",
    tags: ["muscle building", "hypertrophy", "strength"],
    publishedAt: new Date("2024-01-15"),
    readTime: 8,
    featured: true,
  },
  // ... more posts
];

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = demoPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = demoPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different slug)
  const relatedPosts = demoPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/80 mb-4">
            {post.category.replace("_", " ")}
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(post.publishedAt, "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.thumbnail && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div 
            className="text-white/80 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/60 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex items-center gap-4 pb-12 border-b border-white/10">
          <span className="text-white/60">Share this article:</span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
              title="Share on Threads"
            >
              <AtSign className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="py-12 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <User className="h-8 w-8 text-white/60" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">David Knežević</h3>
              <p className="text-sm text-white/60 mb-3">
                From a small Serbian village to Dubai&apos;s elite fitness scene. Professional fitness coach and mentor helping clients transform their bodies and minds.
              </p>
              <Link
                href="/about"
                className="text-sm text-white/80 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                Learn more about David
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="glass-card rounded-xl p-4 hover:bg-white/15 transition-colors group"
                >
                  <h3 className="font-medium text-white mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock className="h-3 w-3" />
                    {relatedPost.readTime} min read
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

// Simple markdown-like content formatter
function formatContent(content: string): string {
  return content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-white underline hover:text-white/80">$1</a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4">$2</li>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p class="mb-4">${match}</p>`;
    });
}
