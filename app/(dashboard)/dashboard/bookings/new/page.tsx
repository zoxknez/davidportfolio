"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Video,
  User,
} from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, isAfter } from "date-fns";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const coachingPackages = [
  {
    id: "starter",
    name: "Starter Session",
    duration: 60,
    price: 99,
    description: "Perfect for first-time clients",
  },
  {
    id: "deep-dive",
    name: "Deep Dive Session",
    duration: 90,
    price: 149,
    description: "Comprehensive assessment and planning",
  },
  {
    id: "follow-up",
    name: "Follow-up Session",
    duration: 45,
    price: 79,
    description: "For existing clients",
  },
];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  // Simulated booked slots (in production, fetch from API)
  const bookedSlots: Record<string, string[]> = {
    [format(addDays(today, 1), "yyyy-MM-dd")]: ["10:00", "14:00"],
    [format(addDays(today, 2), "yyyy-MM-dd")]: ["09:00", "11:00", "15:00"],
  };

  const getAvailableSlots = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const booked = bookedSlots[dateKey] || [];
    return timeSlots.filter((slot) => !booked.includes(slot));
  };

  const isDateSelectable = (date: Date) => {
    // Can't select past dates or today
    return isAfter(date, today);
  };

  const handleSubmit = async () => {
    if (!selectedPackage || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Booking confirmed! 🎉", {
        description: "You'll receive a confirmation email shortly.",
      });

      router.push("/dashboard/bookings");
    } catch {
      toast.error("Failed to book session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackageData = coachingPackages.find((p) => p.id === selectedPackage);

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bookings
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Book a Session</h1>
          <p className="text-white/60">
            Schedule your 1-on-1 coaching session with David
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {step > s ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-0.5 ${
                    step > s ? "bg-white" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Package */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Session Type
            </h2>

            <div className="space-y-3">
              {coachingPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`w-full p-5 rounded-xl text-left transition-all ${
                    selectedPackage === pkg.id
                      ? "bg-white/20 border-2 border-white"
                      : "glass-card hover:bg-white/15 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{pkg.name}</h3>
                      <p className="text-sm text-white/60 mb-2">{pkg.description}</p>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pkg.duration} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Video call
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">${pkg.price}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedPackage}
                className="bg-white text-black hover:bg-white/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date & Time
            </h2>

            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekStart(addDays(weekStart, -7))}
                className="text-white/60 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-white font-medium">
                {format(weekStart, "MMMM yyyy")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekStart(addDays(weekStart, 7))}
                className="text-white/60 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {weekDays.map((date) => {
                const isSelectable = isDateSelectable(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => isSelectable && setSelectedDate(date)}
                    disabled={!isSelectable}
                    className={`p-3 rounded-lg text-center transition-all ${
                      isSelected
                        ? "bg-white text-black"
                        : isSelectable
                        ? "glass-card hover:bg-white/15 text-white"
                        : "bg-white/5 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    <div className="text-xs mb-1">{format(date, "EEE")}</div>
                    <div className="text-lg font-semibold">{format(date, "d")}</div>
                  </button>
                );
              })}
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available Times for {format(selectedDate, "MMMM d")}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {getAvailableSlots(selectedDate).map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedTime === time
                          ? "bg-white text-black"
                          : "glass-card hover:bg-white/15 text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                className="text-white/60 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="bg-white text-black hover:bg-white/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm & Notes */}
        {step === 3 && selectedPackageData && selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Confirm Your Booking
            </h2>

            {/* Summary Card */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Session Type</span>
                  <span className="text-white font-medium">{selectedPackageData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Date</span>
                  <span className="text-white font-medium">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Time</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Duration</span>
                  <span className="text-white font-medium">{selectedPackageData.duration} minutes</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-bold text-white">${selectedPackageData.price}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Add a note (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell David what you'd like to discuss..."
                className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(2)}
                className="text-white/60 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-white/90"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
