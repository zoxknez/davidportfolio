"use client";

import { motion } from "framer-motion";
import { Dumbbell, TrendingUp, Calendar, CreditCard } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    activePrograms: number;
    completedWorkouts: number;
    upcomingBookings: number;
    totalSpent: number;
  };
}

const statItems = [
  {
    name: "Active Programs",
    icon: Dumbbell,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Workouts Completed",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Upcoming Sessions",
    icon: Calendar,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Total Invested",
    icon: CreditCard,
    color: "from-orange-500 to-red-500",
  },
];

export function DashboardStats({ stats }: DashboardStatsProps) {
  const values = [
    stats.activePrograms,
    stats.completedWorkouts,
    stats.upcomingBookings,
    `$${stats.totalSpent.toLocaleString()}`,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-6 hover:bg-white/15 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/60 mb-1">{item.name}</p>
              <p className="text-3xl font-bold text-white">{values[index]}</p>
            </div>
            <div
              className={`p-3 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-20`}
            >
              <item.icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
