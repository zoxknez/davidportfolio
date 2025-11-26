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
    trailer: "https://cdn.coverr.co/videos/coverr-gym-workout-with-dumbbells-4646/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=1600&auto=format&fit=crop",
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
    trailer: "https://cdn.coverr.co/videos/coverr-crossfit-battle-ropes-1566/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1517963879466-cd115eb9d433?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1600&auto=format&fit=crop",
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
    trailer: "https://cdn.coverr.co/videos/coverr-woman-doing-squats-with-weights-4648/1080p.mp4",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1600&auto=format&fit=crop",
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


