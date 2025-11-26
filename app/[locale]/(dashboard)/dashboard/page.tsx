import { auth } from "@/lib/auth";
import { prisma, Prisma } from "@/lib/db";
import { DashboardStats } from "@/components/dashboard/stats";
import { ActivePrograms } from "@/components/dashboard/active-programs";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { UpcomingBookings } from "@/components/dashboard/upcoming-bookings";
import { QuickActions } from "@/components/dashboard/quick-actions";

export const metadata = {
  title: "Dashboard",
  description: "Your personal fitness dashboard",
};

// Define select objects for proper typing
const programProgressSelect = {
  id: true,
  currentWeek: true,
  currentDay: true,
  startedAt: true,
  completedAt: true,
  program: {
    select: {
      id: true,
      name: true,
      category: true,
      duration: true,
      thumbnail: true,
    },
  },
  workouts: {
    select: {
      id: true,
      completedAt: true,
      duration: true,
    },
    orderBy: { completedAt: "desc" as const },
    take: 5,
  },
} satisfies Prisma.ProgramProgressSelect;

const orderSelect = {
  id: true,
  orderNumber: true,
  total: true,
  createdAt: true,
  items: {
    select: {
      name: true,
      price: true,
    },
  },
} satisfies Prisma.OrderSelect;

const bookingSelect = {
  id: true,
  date: true,
  time: true,
  duration: true,
  status: true,
  meetingUrl: true,
  package: {
    select: {
      name: true,
      type: true,
    },
  },
} satisfies Prisma.BookingSelect;

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  // Fetch user's data with proper typing
  const programProgress = await prisma.programProgress.findMany({
    where: { userId: session.user.id },
    select: programProgressSelect,
    orderBy: { startedAt: "desc" },
  });

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id, status: "COMPLETED" },
    select: orderSelect,
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
      date: { gte: new Date() },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: bookingSelect,
    orderBy: { date: "asc" },
    take: 3,
  });

  // Calculate stats
  const stats = {
    activePrograms: programProgress.filter((p) => !p.completedAt).length,
    completedWorkouts: programProgress.reduce(
      (sum, p) => sum + p.workouts.length,
      0
    ),
    upcomingBookings: bookings.length,
    totalSpent: orders.reduce((sum, o) => sum + Number(o.total), 0),
  };

  const firstName = session.user.name?.split(" ")[0] || "there";

  // Transform data for components
  const programsForComponent = programProgress.map((p) => ({
    ...p,
    program: {
      ...p.program,
      totalWorkouts: p.workouts.length, // This would ideally come from the program
    },
  }));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-white/60">
          Here&apos;s what&apos;s happening with your fitness journey today.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Programs */}
        <div className="lg:col-span-2">
          <ActivePrograms programs={programsForComponent} />
        </div>

        {/* Upcoming Bookings */}
        <div>
          <UpcomingBookings bookings={bookings} />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity programProgress={programProgress} orders={orders} />
    </div>
  );
}
