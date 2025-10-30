export type Program = {
  slug: string;
  title: string;
  goal: string;
  level: "beginner" | "intermediate" | "advanced";
  weeks: number;
  daysPerWeek: number;
  trailer?: string; // mp4 url
  image: string;
  gallery?: string[];
  equipment: string[];
  syllabus: string[];
  priceOneOff: number; // USD demo
  includedIn?: string[]; // subscription tiers later
};

export const programs: Program[] = [
  {
    slug: "functional-bodybuilding",
    title: "Functional Bodybuilding",
    goal: "Build muscle and move better",
    level: "intermediate",
    weeks: 8,
    daysPerWeek: 4,
    trailer: "https://cdn.coverr.co/videos/coverr-athletes-exercising-3265/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=1600&auto=format&fit=crop",
    ],
    equipment: ["Dumbbells", "Barbell", "Bench"],
    syllabus: [
      "Upper/Lower splits with tempo work",
      "Movement quality and stability blocks",
      "Accessory circuits and conditioning",
    ],
    priceOneOff: 59,
  },
  {
    slug: "hyrox-prep",
    title: "HYROX Prep",
    goal: "Engineered conditioning for race day",
    level: "advanced",
    weeks: 10,
    daysPerWeek: 5,
    trailer: "https://cdn.coverr.co/videos/coverr-running-at-the-stadium-9164/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop",
    ],
    equipment: ["Rower", "SkiErg", "Sled"],
    syllabus: [
      "Brick sessions and race simulations",
      "Mixed modal intervals",
      "Strength maintenance and mobility",
    ],
    priceOneOff: 69,
  },
  {
    slug: "womens-strength",
    title: "Women’s Strength",
    goal: "Get strong with minimal equipment",
    level: "beginner",
    weeks: 6,
    daysPerWeek: 3,
    trailer: "https://cdn.coverr.co/videos/coverr-girl-exercising-in-the-living-room-5396/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2f276d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1600&auto=format&fit=crop",
    ],
    equipment: ["Kettlebell", "Bands"],
    syllabus: [
      "Fundamental movement patterns",
      "Progressive overload and form cues",
      "Optional conditioning finishers",
    ],
    priceOneOff: 49,
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}


