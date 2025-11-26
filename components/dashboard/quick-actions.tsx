"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Play, 
  Calendar, 
  ShoppingBag, 
  Target, 
  BookOpen,
  Trophy,
} from "lucide-react";

const quickActions = [
  {
    name: "Continue Workout",
    description: "Pick up where you left off",
    href: "/dashboard/programs",
    icon: Play,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Book Session",
    description: "Schedule 1-on-1 coaching",
    href: "/dashboard/bookings/new",
    icon: Calendar,
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Browse Programs",
    description: "Explore new programs",
    href: "/programs",
    icon: ShoppingBag,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Track Progress",
    description: "View your achievements",
    href: "/dashboard/progress",
    icon: Target,
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Read Blog",
    description: "Tips and motivation",
    href: "/blog",
    icon: BookOpen,
    color: "from-teal-500 to-green-600",
  },
  {
    name: "View Achievements",
    description: "Celebrate your wins",
    href: "/dashboard/achievements",
    icon: Trophy,
    color: "from-yellow-500 to-orange-600",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {quickActions.map((action, index) => (
        <motion.div
          key={action.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={action.href}
            className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-sm font-medium text-white mb-1 group-hover:text-white/90">
              {action.name}
            </h3>
            <p className="text-xs text-white/50">{action.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
