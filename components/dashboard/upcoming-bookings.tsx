"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  date: Date;
  time: string;
  duration: number;
  status: string;
  meetingUrl: string | null;
  package: {
    name: string;
    type: string;
  };
}

interface UpcomingBookingsProps {
  bookings: Booking[];
}

export function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  if (bookings.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 h-full">
        <h2 className="text-xl font-semibold text-white mb-4">
          Upcoming Sessions
        </h2>
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Calendar className="h-6 w-6 text-white/40" />
          </div>
          <h3 className="text-sm font-medium text-white mb-2">
            No upcoming sessions
          </h3>
          <p className="text-xs text-white/60 mb-4">
            Book a coaching session to get started
          </p>
          <Button size="sm" variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard/bookings">
              <Plus className="h-4 w-4 mr-1" />
              Book Session
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Upcoming Sessions</h2>
        <Link
          href="/dashboard/bookings"
          className="text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">
                {booking.package.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(booking.date), "MMM d, yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {booking.time} ({booking.duration} min)
              </div>
            </div>

            {booking.meetingUrl && booking.status === "CONFIRMED" && (
              <Button
                size="sm"
                className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white"
                asChild
              >
                <a href={booking.meetingUrl} target="_blank" rel="noopener noreferrer">
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </a>
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
