"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  CheckCircle, 
  ShoppingBag, 
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProgramProgress {
  id: string;
  program: {
    name: string;
  };
  workouts: Array<{
    id: string;
    completedAt: Date;
  }>;
}

interface Order {
  id: string;
  orderNumber: string;
  total: number | { toNumber: () => number };
  createdAt: Date;
  items: Array<{
    name: string;
  }>;
}

interface RecentActivityProps {
  programProgress: ProgramProgress[];
  orders: Order[];
}

type ActivityItem = {
  id: string;
  type: "workout" | "order";
  title: string;
  description: string;
  date: Date;
  icon: typeof CheckCircle | typeof ShoppingBag;
  color: string;
};

export function RecentActivity({ programProgress, orders }: RecentActivityProps) {
  // Combine and sort activities
  const activities: ActivityItem[] = [];

  // Add completed workouts
  programProgress.forEach((progress) => {
    progress.workouts.forEach((workout) => {
      activities.push({
        id: workout.id,
        type: "workout",
        title: "Workout Completed",
        description: `Completed workout in ${progress.program.name}`,
        date: new Date(workout.completedAt),
        icon: CheckCircle,
        color: "text-green-400",
      });
    });
  });

  // Add orders
  orders.forEach((order) => {
    const totalValue = typeof order.total === 'object' && 'toNumber' in order.total 
      ? order.total.toNumber() 
      : Number(order.total);
    activities.push({
      id: order.id,
      type: "order",
      title: "Purchase Made",
      description: `Purchased ${order.items.map((i) => i.name).join(", ")} for $${totalValue}`,
      date: new Date(order.createdAt),
      icon: ShoppingBag,
      color: "text-blue-400",
    });
  });

  // Sort by date, most recent first
  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Take only the latest 10
  const recentActivities = activities.slice(0, 10);

  if (recentActivities.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-white/40" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            No activity yet
          </h3>
          <p className="text-white/60">
            Start working out to see your progress here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 relative"
            >
              {/* Icon */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 ${activity.color}`}
              >
                <activity.icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-medium text-white">{activity.title}</p>
                <p className="text-sm text-white/60 truncate">
                  {activity.description}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-white/40">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(activity.date, { addSuffix: true })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
