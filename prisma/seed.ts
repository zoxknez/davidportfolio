// Prisma 7 - Import from generated client location
import { PrismaClient, $Enums } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Use enum values from generated client
const { Level, Category, CoachingType, BlogCategory } = $Enums;

// Prisma 7 requires driver adapter
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required for seeding");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================================================
  // USERS
  // ============================================================================
  console.log("Creating users...");
  
  const hashedPassword = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "david@elitefitness.com" },
    update: {},
    create: {
      email: "david@elitefitness.com",
      name: "David Knežević",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const testUser = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      password: hashedPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Created users: ${admin.email}, ${testUser.email}`);

  // ============================================================================
  // PROGRAMS
  // ============================================================================
  console.log("Creating programs...");

  const programs = [
    {
      slug: "build-muscle-12-week",
      name: "Build Muscle 12 Week Program",
      description: `A comprehensive 12-week program designed to help you build lean muscle mass and increase strength. This program combines progressive overload techniques with proper nutrition guidance to maximize your results.

Each week is carefully structured to ensure optimal muscle stimulation and recovery. You'll work all major muscle groups with a focus on compound movements that build real-world strength.

Perfect for intermediate lifters looking to take their physique to the next level.`,
      shortDescription: "Build lean muscle and increase strength with this comprehensive 12-week transformation program.",
      price: 149.99,
      currency: "USD",
      duration: "12 weeks",
      level: Level.INTERMEDIATE,
      category: Category.HYPERTROPHY,
      featured: true,
      features: [
        "48 structured workout sessions",
        "Progressive overload programming",
        "Video demonstrations for all exercises",
        "Weekly check-in templates",
        "Nutrition guidelines included",
      ],
      benefits: [
        "Build 5-10 lbs of lean muscle",
        "Increase strength by 20-30%",
        "Improve body composition",
        "Learn proper lifting techniques",
      ],
      includes: [
        "Full program PDF",
        "Exercise video library access",
        "Nutrition macro calculator",
        "Email support",
      ],
      totalWorkouts: 48,
      averageRating: 4.8,
      reviewCount: 127,
      enrollmentCount: 1450,
    },
    {
      slug: "fat-loss-shred",
      name: "Fat Loss Shred Program",
      description: `Burn fat and reveal your best physique with this scientifically-designed 8-week shredding program. Combines high-intensity workouts with metabolic conditioning to maximize calorie burn.

This program focuses on maintaining muscle mass while creating a caloric deficit. You'll learn the secrets of effective fat loss without sacrificing your hard-earned muscle.

Perfect for anyone looking to get lean and defined.`,
      shortDescription: "Burn fat and get shredded with this 8-week high-intensity transformation program.",
      price: 99.99,
      currency: "USD",
      duration: "8 weeks",
      level: Level.INTERMEDIATE,
      category: Category.FAT_LOSS,
      featured: true,
      features: [
        "40 fat-burning workouts",
        "HIIT and steady-state cardio mix",
        "Calorie and macro guidelines",
        "Progress tracking sheets",
        "Supplement recommendations",
      ],
      benefits: [
        "Lose 10-15 lbs of body fat",
        "Reveal muscle definition",
        "Boost metabolism",
        "Increase cardiovascular fitness",
      ],
      includes: [
        "Complete workout program",
        "Meal plan templates",
        "Shopping lists",
        "Community access",
      ],
      totalWorkouts: 40,
      averageRating: 4.9,
      reviewCount: 203,
      enrollmentCount: 2100,
    },
    {
      slug: "strength-fundamentals",
      name: "Strength Fundamentals",
      description: `Master the fundamentals of strength training with this beginner-friendly program. Learn proper form, build a solid foundation, and prepare yourself for more advanced training.

This program teaches you the essential movement patterns - squat, hinge, push, pull, and carry. You'll develop the strength and mobility needed for long-term success.

Perfect for beginners or anyone returning to fitness after a break.`,
      shortDescription: "Learn the fundamentals of strength training and build a solid foundation.",
      price: 79.99,
      currency: "USD",
      duration: "8 weeks",
      level: Level.BEGINNER,
      category: Category.STRENGTH,
      featured: false,
      features: [
        "32 beginner-friendly workouts",
        "Detailed form tutorials",
        "Mobility and flexibility work",
        "Progress tracking",
        "Equipment-free alternatives",
      ],
      benefits: [
        "Learn proper lifting form",
        "Build foundational strength",
        "Improve mobility",
        "Develop workout habits",
      ],
      includes: [
        "Beginner workout guide",
        "Form check videos",
        "Mobility routines",
        "Email support",
      ],
      totalWorkouts: 32,
      averageRating: 4.7,
      reviewCount: 89,
      enrollmentCount: 890,
    },
    {
      slug: "hyrox-prep",
      name: "HYROX Competition Prep",
      description: `Prepare for HYROX competition with this specialized training program. Combines functional fitness, endurance training, and sport-specific movements to get you race-ready.

This program follows a periodized approach, building your work capacity and refining your race strategy as competition day approaches. You'll train all 8 HYROX workout stations.

Perfect for athletes serious about competing in HYROX events.`,
      shortDescription: "Get race-ready for HYROX competition with sport-specific training.",
      price: 199.99,
      currency: "USD",
      duration: "12 weeks",
      level: Level.ADVANCED,
      category: Category.HYROX,
      featured: true,
      features: [
        "60 specialized workouts",
        "HYROX station-specific training",
        "Race simulation workouts",
        "Pacing strategies",
        "Nutrition for endurance",
      ],
      benefits: [
        "Complete HYROX preparation",
        "Improve work capacity",
        "Master all 8 stations",
        "Develop race strategy",
      ],
      includes: [
        "Complete training program",
        "Race day guide",
        "Nutrition protocol",
        "1 coaching call",
      ],
      totalWorkouts: 60,
      averageRating: 4.9,
      reviewCount: 45,
      enrollmentCount: 320,
    },
    {
      slug: "bodybuilding-pro",
      name: "Bodybuilding Pro Split",
      description: `Take your physique to the next level with this advanced bodybuilding program. Features a classic push/pull/legs split with emphasis on muscle hypertrophy and symmetry.

This program includes advanced techniques like drop sets, supersets, and rest-pause training to maximize muscle growth. Each workout is designed to thoroughly work the target muscles.

Perfect for experienced lifters looking to build competition-worthy physique.`,
      shortDescription: "Advanced bodybuilding program for maximum muscle development.",
      price: 179.99,
      currency: "USD",
      duration: "16 weeks",
      level: Level.ADVANCED,
      category: Category.BODYBUILDING,
      featured: false,
      features: [
        "64 hypertrophy workouts",
        "Advanced training techniques",
        "Symmetry assessments",
        "Posing guidance",
        "Competition prep option",
      ],
      benefits: [
        "Maximum muscle growth",
        "Improved symmetry",
        "Contest-ready conditioning",
        "Advanced training skills",
      ],
      includes: [
        "Full periodized program",
        "Posing videos",
        "Peak week protocol",
        "Monthly check-ins",
      ],
      totalWorkouts: 64,
      averageRating: 4.8,
      reviewCount: 67,
      enrollmentCount: 450,
    },
    {
      slug: "athletic-performance",
      name: "Athletic Performance Training",
      description: `Enhance your athletic abilities with this performance-focused program. Builds power, speed, agility, and sport-specific conditioning for better performance in any sport.

This program incorporates plyometrics, Olympic lifting variations, and sport-specific drills. You'll develop explosive power and improve your overall athleticism.

Perfect for athletes looking to gain a competitive edge.`,
      shortDescription: "Enhance your athletic performance with power, speed, and agility training.",
      price: 159.99,
      currency: "USD",
      duration: "10 weeks",
      level: Level.INTERMEDIATE,
      category: Category.PERFORMANCE,
      featured: false,
      features: [
        "50 performance workouts",
        "Plyometric training",
        "Speed and agility drills",
        "Power development",
        "Sport-specific modules",
      ],
      benefits: [
        "Increase explosiveness",
        "Improve speed and agility",
        "Enhance coordination",
        "Better sport performance",
      ],
      includes: [
        "Training program",
        "Movement tutorials",
        "Performance testing",
        "Recovery protocols",
      ],
      totalWorkouts: 50,
      averageRating: 4.7,
      reviewCount: 78,
      enrollmentCount: 580,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    });
  }

  console.log(`✅ Created ${programs.length} programs`);

  // ============================================================================
  // COACHING PACKAGES
  // ============================================================================
  console.log("Creating coaching packages...");

  const coachingPackages = [
    {
      name: "1-on-1 Starter",
      type: CoachingType.ONE_ON_ONE,
      description: "Perfect for beginners. Get personalized guidance and form correction to start your fitness journey the right way.",
      price: 199.99,
      currency: "USD",
      sessions: 4,
      duration: "1 month",
      features: [
        "4 x 60-minute video sessions",
        "Custom workout plan",
        "Form corrections",
        "Basic nutrition guidance",
        "WhatsApp support",
      ],
      popular: false,
    },
    {
      name: "1-on-1 Transform",
      type: CoachingType.ONE_ON_ONE,
      description: "Our most popular package. Comprehensive coaching for serious transformation with ongoing support and adjustments.",
      price: 499.99,
      currency: "USD",
      sessions: 12,
      duration: "3 months",
      features: [
        "12 x 60-minute video sessions",
        "Periodized training program",
        "Weekly program adjustments",
        "Full nutrition plan",
        "24/7 WhatsApp support",
        "Progress photos review",
      ],
      popular: true,
    },
    {
      name: "1-on-1 Elite",
      type: CoachingType.ONE_ON_ONE,
      description: "The ultimate coaching experience. Daily check-ins, fully customized programming, and VIP support for maximum results.",
      price: 999.99,
      currency: "USD",
      sessions: 24,
      duration: "6 months",
      features: [
        "24 x 60-minute video sessions",
        "Daily check-ins",
        "Fully customized programming",
        "Detailed macro plan",
        "Supplement protocol",
        "VIP priority support",
        "Monthly video analysis",
      ],
      popular: false,
    },
    {
      name: "Group Training",
      type: CoachingType.GROUP,
      description: "Train with a small group for motivation and accountability. All the benefits of coaching at a fraction of the cost.",
      price: 99.99,
      currency: "USD",
      sessions: 8,
      duration: "1 month",
      features: [
        "8 x 45-minute group sessions",
        "Max 6 people per group",
        "Shared workout program",
        "Group chat community",
        "Weekly Q&A sessions",
      ],
      popular: false,
    },
  ];

  for (const pkg of coachingPackages) {
    await prisma.coachingPackage.create({
      data: pkg,
    });
  }

  console.log(`✅ Created ${coachingPackages.length} coaching packages`);

  // ============================================================================
  // TESTIMONIALS
  // ============================================================================
  console.log("Creating testimonials...");

  const testimonials = [
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "David's program completely transformed my approach to fitness. In 12 weeks, I gained 15 lbs of muscle while actually improving my energy levels at work. The structured programming made it easy to stay consistent.",
      rating: 5,
      featured: true,
    },
    {
      name: "Sarah Williams",
      role: "Marketing Director",
      content: "As a busy professional, I needed something efficient. David's fat loss program gave me exactly that. Lost 20 lbs in 8 weeks without feeling deprived. The nutrition guidance was a game-changer.",
      rating: 5,
      featured: true,
    },
    {
      name: "James Rodriguez",
      role: "HYROX Competitor",
      content: "The HYROX prep program is elite. David's attention to detail and sport-specific training helped me finish in the top 10% of my age group. Couldn't have done it without this program.",
      rating: 5,
      featured: true,
    },
    {
      name: "Emma Thompson",
      role: "Fitness Enthusiast",
      content: "Started as a complete beginner with the Strength Fundamentals program. 8 weeks later, I'm confident in the gym and actually enjoying my workouts. David explains everything so clearly.",
      rating: 5,
      featured: false,
    },
    {
      name: "David Park",
      role: "Entrepreneur",
      content: "The 1-on-1 coaching was worth every penny. Having David review my form and adjust my program weekly kept me accountable and on track. Best investment I've made in my health.",
      rating: 5,
      featured: true,
    },
    {
      name: "Lisa Anderson",
      role: "Teacher",
      content: "I've tried countless programs before, but this is the first one I actually completed. The progressive structure kept me motivated, and the results speak for themselves.",
      rating: 4,
      featured: false,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log(`✅ Created ${testimonials.length} testimonials`);

  // ============================================================================
  // BLOG POSTS
  // ============================================================================
  console.log("Creating blog posts...");

  const blogPosts = [
    {
      slug: "5-essential-compound-movements",
      title: "5 Essential Compound Movements Everyone Should Master",
      excerpt: "Learn the fundamental compound exercises that form the foundation of any effective training program. These movements build real-world strength and muscle.",
      content: `
# 5 Essential Compound Movements Everyone Should Master

Compound movements are the foundation of any effective training program. These exercises work multiple muscle groups simultaneously, making them incredibly efficient for building strength and muscle.

## 1. The Squat

The squat is often called the king of exercises, and for good reason. This movement works your quads, hamstrings, glutes, and core all at once.

**Key Points:**
- Keep your chest up and core tight
- Push your knees out over your toes
- Descend until your thighs are parallel to the ground
- Drive through your heels to stand up

## 2. The Deadlift

The deadlift is unmatched for building posterior chain strength. It works your back, glutes, hamstrings, and grip.

**Key Points:**
- Start with the bar over mid-foot
- Hinge at the hips, keeping your back flat
- Drive through the floor to stand up
- Keep the bar close to your body throughout

## 3. The Bench Press

The bench press is the ultimate upper body pushing movement. It develops your chest, shoulders, and triceps.

**Key Points:**
- Arch your upper back slightly
- Grip the bar just outside shoulder width
- Lower the bar to your mid-chest
- Press up and slightly back

## 4. The Overhead Press

The overhead press builds impressive shoulder strength and size while also working your core and triceps.

**Key Points:**
- Start with the bar at shoulder height
- Brace your core and squeeze your glutes
- Press straight up, moving your head back then forward
- Lock out fully at the top

## 5. The Barbell Row

The barbell row balances out all the pressing movements by strengthening your back muscles.

**Key Points:**
- Hinge forward at about 45 degrees
- Pull the bar to your lower chest
- Squeeze your shoulder blades together
- Lower with control

## Conclusion

Master these five movements, and you'll have a solid foundation for any training goal. Focus on form first, then gradually add weight over time.
      `,
      author: "David Knežević",
      category: BlogCategory.TRAINING_TIPS,
      tags: ["strength", "compound movements", "beginner", "technique"],
      featured: true,
      published: true,
      publishedAt: new Date("2024-01-15"),
      readTime: 8,
    },
    {
      slug: "nutrition-basics-for-muscle-building",
      title: "Nutrition Basics for Building Muscle",
      excerpt: "Understanding the fundamentals of nutrition for muscle growth. Learn about protein, calories, and meal timing for optimal results.",
      content: `
# Nutrition Basics for Building Muscle

Building muscle isn't just about training hard – nutrition plays an equally important role. Here's what you need to know.

## Caloric Surplus

To build muscle, you need to consume more calories than you burn. Aim for a surplus of 300-500 calories per day.

## Protein Requirements

Protein is the building block of muscle. Aim for:
- 1.6-2.2g per kg of bodyweight
- Spread intake across 4-5 meals
- Include protein with every meal

## Carbohydrates for Energy

Carbs fuel your workouts and aid recovery:
- 3-5g per kg bodyweight
- Focus on complex carbs
- Time carbs around workouts

## Healthy Fats

Don't neglect fats:
- 0.5-1g per kg bodyweight
- Include omega-3 sources
- Supports hormone production

## Meal Timing

While total daily intake matters most:
- Eat protein every 3-4 hours
- Have a meal 2-3 hours before training
- Consume protein within 2 hours post-workout

## Conclusion

Consistency with nutrition is key. Track your intake initially to ensure you're hitting your targets.
      `,
      author: "David Knežević",
      category: BlogCategory.NUTRITION,
      tags: ["nutrition", "muscle building", "protein", "diet"],
      featured: true,
      published: true,
      publishedAt: new Date("2024-01-22"),
      readTime: 6,
    },
    {
      slug: "how-to-stay-motivated",
      title: "How to Stay Motivated on Your Fitness Journey",
      excerpt: "Discover practical strategies for maintaining motivation and consistency in your training. Build habits that last.",
      content: `
# How to Stay Motivated on Your Fitness Journey

Motivation fades, but habits last. Here's how to build a sustainable fitness routine.

## Set Clear Goals

Define what you want to achieve:
- Be specific and measurable
- Set both short and long-term goals
- Write them down and review regularly

## Track Your Progress

What gets measured gets managed:
- Take progress photos monthly
- Log your workouts
- Celebrate small wins

## Find Your Why

Dig deep into your motivation:
- Why is this important to you?
- What will achieving your goals mean?
- Connect to something bigger than aesthetics

## Build a Support System

Surround yourself with support:
- Find a training partner
- Join a community
- Share your goals with friends and family

## Make It Enjoyable

If you hate it, you won't stick with it:
- Find activities you enjoy
- Listen to music or podcasts
- Vary your routine

## Conclusion

Focus on building habits rather than relying on motivation. Consistency trumps perfection every time.
      `,
      author: "David Knežević",
      category: BlogCategory.MOTIVATION,
      tags: ["motivation", "mindset", "habits", "consistency"],
      featured: false,
      published: true,
      publishedAt: new Date("2024-02-05"),
      readTime: 5,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`✅ Created ${blogPosts.length} blog posts`);

  // ============================================================================
  // NEWSLETTER SUBSCRIBER (EXAMPLE)
  // ============================================================================
  console.log("Creating newsletter subscriber...");

  await prisma.newsletter.upsert({
    where: { email: "subscriber@example.com" },
    update: {},
    create: {
      email: "subscriber@example.com",
      subscribed: true,
      source: "seed",
    },
  });

  console.log("✅ Created newsletter subscriber");

  console.log("\n🌱 Database seeding completed successfully!");
  console.log("\n📋 Summary:");
  console.log(`   - Users: 2`);
  console.log(`   - Programs: ${programs.length}`);
  console.log(`   - Coaching Packages: ${coachingPackages.length}`);
  console.log(`   - Testimonials: ${testimonials.length}`);
  console.log(`   - Blog Posts: ${blogPosts.length}`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
