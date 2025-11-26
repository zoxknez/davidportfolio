"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Settings,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Shield,
  Trash2,
  Save,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";

const settingsSections = [
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage how you receive notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    description: "Control your privacy settings",
    icon: Lock,
  },
  {
    id: "billing",
    title: "Billing & Payments",
    description: "Manage your payment methods",
    icon: CreditCard,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize the look and feel",
    icon: Moon,
  },
];

export default function SettingsPage() {
  // Session available via useSession() if needed
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("notifications");
  const [isSaving, setIsSaving] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    workoutReminders: true,
    weeklyProgress: true,
    newPrograms: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showProgress: true,
    allowMessages: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully!");
    setIsSaving(false);
  };

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Mail className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Email Notifications</p>
            <p className="text-sm text-white/60">Receive notifications via email</p>
          </div>
        </div>
        <button
          onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            notifications.email ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              notifications.email ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Smartphone className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Push Notifications</p>
            <p className="text-sm text-white/60">Receive push notifications on your device</p>
          </div>
        </div>
        <button
          onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            notifications.push ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              notifications.push ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Bell className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Workout Reminders</p>
            <p className="text-sm text-white/60">Get reminded about your scheduled workouts</p>
          </div>
        </div>
        <button
          onClick={() =>
            setNotifications({ ...notifications, workoutReminders: !notifications.workoutReminders })
          }
          className={`relative w-12 h-6 rounded-full transition-colors ${
            notifications.workoutReminders ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              notifications.workoutReminders ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Globe className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Weekly Progress Report</p>
            <p className="text-sm text-white/60">Receive weekly summary of your progress</p>
          </div>
        </div>
        <button
          onClick={() =>
            setNotifications({ ...notifications, weeklyProgress: !notifications.weeklyProgress })
          }
          className={`relative w-12 h-6 rounded-full transition-colors ${
            notifications.weeklyProgress ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              notifications.weeklyProgress ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Mail className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Marketing Emails</p>
            <p className="text-sm text-white/60">Receive news about new programs and offers</p>
          </div>
        </div>
        <button
          onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            notifications.marketing ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              notifications.marketing ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Globe className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Public Profile</p>
            <p className="text-sm text-white/60">Allow others to see your profile</p>
          </div>
        </div>
        <button
          onClick={() => setPrivacy({ ...privacy, profilePublic: !privacy.profilePublic })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            privacy.profilePublic ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              privacy.profilePublic ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Shield className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Show Progress</p>
            <p className="text-sm text-white/60">Show your workout progress to other members</p>
          </div>
        </div>
        <button
          onClick={() => setPrivacy({ ...privacy, showProgress: !privacy.showProgress })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            privacy.showProgress ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              privacy.showProgress ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5">
            <Mail className="h-5 w-5 text-white/60" />
          </div>
          <div>
            <p className="font-medium text-white">Allow Messages</p>
            <p className="text-sm text-white/60">Let other members send you messages</p>
          </div>
        </div>
        <button
          onClick={() => setPrivacy({ ...privacy, allowMessages: !privacy.allowMessages })}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            privacy.allowMessages ? "bg-green-500" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
              privacy.allowMessages ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-red-500/20">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-red-400">Delete Account</p>
            <p className="text-sm text-white/60 mt-1">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Current Plan</h3>
          <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full">
            Active
          </span>
        </div>
        <p className="text-3xl font-bold text-white mb-2">
          Free <span className="text-base font-normal text-white/60">Plan</span>
        </p>
        <p className="text-white/60 mb-4">
          Upgrade to unlock premium features and exclusive content.
        </p>
        <Button className="w-full bg-white text-black hover:bg-white/90">
          Upgrade to Premium
        </Button>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
        <div className="text-center py-8 text-white/60">
          <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No payment methods added</p>
          <Button variant="outline" size="sm" className="mt-4">
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="text-center py-8 text-white/60">
          <p>No billing history yet</p>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
        <p className="text-white/60 mb-6">Choose how the application looks to you</p>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-4 rounded-xl border-2 transition-all ${
              theme === "light"
                ? "border-white bg-white/10"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <p className="font-medium text-white">Light</p>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-xl border-2 transition-all ${
              theme === "dark"
                ? "border-white bg-white/10"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <Moon className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <p className="font-medium text-white">Dark</p>
          </button>

          <button
            onClick={() => setTheme("system")}
            className={`p-4 rounded-xl border-2 transition-all ${
              theme === "system"
                ? "border-white bg-white/10"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <Settings className="h-8 w-8 mx-auto mb-2 text-white/60" />
            <p className="font-medium text-white">System</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "notifications":
        return renderNotifications();
      case "privacy":
        return renderPrivacy();
      case "billing":
        return renderBilling();
      case "appearance":
        return renderAppearance();
      default:
        return renderNotifications();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/60">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === section.id
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span className="font-medium">{section.title}</span>
                <ChevronRight
                  className={`h-4 w-4 ml-auto transition-transform ${
                    activeSection === section.id ? "rotate-90" : ""
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                {settingsSections.find((s) => s.id === activeSection)?.title}
              </h2>
              <p className="text-white/60">
                {settingsSections.find((s) => s.id === activeSection)?.description}
              </p>
            </div>

            {renderContent()}

            {/* Save Button */}
            {(activeSection === "notifications" || activeSection === "privacy") && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-white text-black hover:bg-white/90"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
