"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles, Download, Mail } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber?: string;
    email?: string;
  }>({});

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#ffd700", "#ff6b6b", "#4ecdc4"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffffff", "#ffd700", "#ff6b6b", "#4ecdc4"],
      });
    }, 250);

    // Fetch order details if session_id is available
    if (sessionId) {
      // You could fetch order details here
      setOrderDetails({
        orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}`,
      });
    }

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Payment Successful! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/70 text-lg mb-8"
        >
          Thank you for your purchase. Your fitness journey starts now!
        </motion.p>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          {orderDetails.orderNumber && (
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <span className="text-white/60">Order Number</span>
              <span className="text-white font-mono">{orderDetails.orderNumber}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3 pt-4 text-white/70">
            <Mail className="h-5 w-5" />
            <span className="text-sm">
              A confirmation email has been sent to your email address
            </span>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 justify-center">
            <Sparkles className="h-5 w-5" />
            What&apos;s Next?
          </h3>
          
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3 text-white/70">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold">1</span>
              <span>Access your program from the dashboard</span>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold">2</span>
              <span>Download the workout PDF for offline access</span>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold">3</span>
              <span>Track your progress and stay consistent</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            className="flex-1 h-12 bg-white text-black hover:bg-white/90 font-semibold rounded-xl group"
            asChild
          >
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 border-white/20 text-white hover:bg-white/10 rounded-xl"
            asChild
          >
            <Link href="/programs">
              <Download className="mr-2 h-4 w-4" />
              Browse More Programs
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
