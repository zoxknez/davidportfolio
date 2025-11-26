import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Trophy,
  ArrowRight,
  Dumbbell,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define types inline to avoid Prisma import issues
interface WorkoutProgressData {
  id: string;
  completedAt: Date;
  duration: number | null;
}

interface ProgramProgressData {
  id: string;
  completedAt: Date | null;
  currentWeek: number;
  currentDay: number;
  startedAt: Date;
  program: {
    name: string;
    category: string;
    duration: string;
  };
  workouts: WorkoutProgressData[];
}

export const metadata = {
  title: "My Programs | Dashboard",
  description: "View and manage your fitness programs",
};

export default async function ProgramsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  // Fetch user's program progress
  const programProgress = await prisma.programProgress.findMany({
    where: { userId: session.user.id },
    include: {
      program: true,
      workouts: {
        orderBy: { completedAt: "desc" },
      },
    },
    orderBy: { startedAt: "desc" },
  }) as ProgramProgressData[];

  // Separate active and completed programs
  const activePrograms = programProgress.filter((p) => !p.completedAt);
  const completedPrograms = programProgress.filter((p) => p.completedAt);

  // Calculate overall stats
  const totalWorkouts = programProgress.reduce(
    (sum, p) => sum + p.workouts.length,
    0
  );
  const totalMinutes = programProgress.reduce((sum, p) => {
    return sum + p.workouts.reduce((wSum, w) => wSum + (w.duration || 0), 0);
  }, 0);

  const stats = [
    {
      label: "Active Programs",
      value: activePrograms.length,
      icon: Play,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Completed Programs",
      value: completedPrograms.length,
      icon: Trophy,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Total Workouts",
      value: totalWorkouts,
      icon: Dumbbell,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Minutes",
      value: totalMinutes,
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Programs</h1>
          <p className="text-white/60">
            Track your progress and manage your fitness programs
          </p>
        </div>
        <Link href="/programs">
          <Button className="bg-white text-black hover:bg-white/90">
            Browse Programs
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div
              className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Active Programs */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Play className="h-5 w-5 text-green-400" />
          Active Programs
        </h2>

        {activePrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePrograms.map((progress) => {
              const progressPercent = Math.min(
                100,
                (progress.currentWeek / (parseInt(progress.program.duration) || 12)) * 100
              );

              return (
                <div
                  key={progress.id}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {progress.program.name}
                      </h3>
                      <p className="text-sm text-white/60 mt-1">
                        {progress.program.category}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                      In Progress
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Week {progress.currentWeek}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Day {progress.currentDay}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="h-4 w-4" />
                        {progress.workouts.length} workouts
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white font-medium">
                          {Math.round(progressPercent)}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-white text-black hover:bg-white/90"
                      >
                        Continue Workout
                        <Play className="h-4 w-4 ml-2" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="h-8 w-8 text-white/40" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No Active Programs
            </h3>
            <p className="text-white/60 max-w-md mx-auto mb-6">
              Start your fitness journey by choosing a program that fits your goals.
            </p>
            <Link href="/programs">
              <Button className="bg-white text-black hover:bg-white/90">
                Explore Programs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Completed Programs */}
      {completedPrograms.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Completed Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPrograms.map((progress) => (
              <div
                key={progress.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {progress.program.name}
                    </h3>
                    <p className="text-sm text-white/60">
                      Completed on{" "}
                      {progress.completedAt?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Dumbbell className="h-4 w-4" />
                    {progress.workouts.length} workouts
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {progress.program.duration} weeks
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  Restart Program
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Programs */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          Recommended for You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "HIIT Mastery",
              category: "High Intensity",
              duration: "8 weeks",
              level: "Intermediate",
            },
            {
              name: "Strength Fundamentals",
              category: "Strength Training",
              duration: "12 weeks",
              level: "Beginner",
            },
            {
              name: "Athletic Performance",
              category: "Sports Training",
              duration: "10 weeks",
              level: "Advanced",
            },
          ].map((program, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                  {program.level}
                </span>
                <span className="text-sm text-white/60">{program.duration}</span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {program.name}
              </h3>
              <p className="text-sm text-white/60 mb-4">{program.category}</p>

              <Link href="/programs">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  View Program
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
