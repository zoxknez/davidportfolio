"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  Edit3,
  Shield,
  Award,
  Target,
  Activity,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    location: "",
    bio: "",
    fitnessGoal: "Build Muscle",
    experienceLevel: "Intermediate",
    preferredWorkoutTime: "Morning",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Update session
    await update({
      ...session,
      user: {
        ...session?.user,
        name: formData.name,
      },
    });

    toast.success("Profile updated successfully!");
    setIsSaving(false);
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Member Since",
      value: "Jan 2024",
      icon: Calendar,
    },
    {
      label: "Programs Completed",
      value: "3",
      icon: Award,
    },
    {
      label: "Total Workouts",
      value: "47",
      icon: Activity,
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: Target,
    },
  ];

  const achievements = [
    {
      title: "First Workout",
      description: "Completed your first workout",
      date: "Jan 15, 2024",
      icon: "🎯",
      unlocked: true,
    },
    {
      title: "Week Warrior",
      description: "Worked out 7 days in a row",
      date: "Feb 3, 2024",
      icon: "🔥",
      unlocked: true,
    },
    {
      title: "Program Graduate",
      description: "Completed your first program",
      date: "Mar 20, 2024",
      icon: "🎓",
      unlocked: true,
    },
    {
      title: "Early Bird",
      description: "Complete 10 morning workouts",
      icon: "🌅",
      unlocked: false,
    },
    {
      title: "Strength Master",
      description: "Lift 100kg in any exercise",
      icon: "💪",
      unlocked: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/60">
            Manage your personal information and preferences
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isSaving}
          className="bg-white text-black hover:bg-white/90"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />
              Saving...
            </span>
          ) : isEditing ? (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </span>
          )}
        </Button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-white/40" />
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white/60 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="City, Country"
                    className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself and your fitness goals..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {session?.user?.name || "Your Name"}
                  </h2>
                  <p className="text-white/60">Fitness Enthusiast</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {session?.user?.email}
                  </span>
                  {formData.phone && (
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {formData.phone}
                    </span>
                  )}
                  {formData.location && (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {formData.location}
                    </span>
                  )}
                </div>
                {formData.bio && (
                  <p className="text-white/80">{formData.bio}</p>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <stat.icon className="h-6 w-6 text-white/60 mb-3" />
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-white/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Fitness Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <h3 className="text-xl font-semibold text-white mb-6">
          Fitness Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-3">
              Fitness Goal
            </label>
            {isEditing ? (
              <select
                value={formData.fitnessGoal}
                onChange={(e) =>
                  setFormData({ ...formData, fitnessGoal: e.target.value })
                }
                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
              >
                <option value="Build Muscle">Build Muscle</option>
                <option value="Lose Fat">Lose Fat</option>
                <option value="Improve Endurance">Improve Endurance</option>
                <option value="Get Stronger">Get Stronger</option>
                <option value="General Fitness">General Fitness</option>
              </select>
            ) : (
              <p className="text-lg font-medium text-white">
                {formData.fitnessGoal}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-3">
              Experience Level
            </label>
            {isEditing ? (
              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({ ...formData, experienceLevel: e.target.value })
                }
                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            ) : (
              <p className="text-lg font-medium text-white">
                {formData.experienceLevel}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-3">
              Preferred Workout Time
            </label>
            {isEditing ? (
              <select
                value={formData.preferredWorkoutTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredWorkoutTime: e.target.value,
                  })
                }
                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            ) : (
              <p className="text-lg font-medium text-white">
                {formData.preferredWorkoutTime}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Achievements
          </h3>
          <span className="text-sm text-white/60">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length} unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                achievement.unlocked
                  ? "bg-white/5 border-white/10"
                  : "bg-white/[0.02] border-white/5 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-white/60 mt-1">
                    {achievement.description}
                  </p>
                  {achievement.date && (
                    <p className="text-xs text-white/40 mt-2">
                      Unlocked: {achievement.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Account Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-400" />
          Account Security
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-4 border-b border-white/10">
            <div>
              <p className="font-medium text-white">Password</p>
              <p className="text-sm text-white/60">
                Last changed 30 days ago
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/10">
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/60">
                Add an extra layer of security
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-white">Connected Accounts</p>
              <p className="text-sm text-white/60">
                Manage your connected accounts
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Manage
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
