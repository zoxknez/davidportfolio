"use client";

import { motion } from "framer-motion";
import { RefreshCcw, Clock, CreditCard, Mail, ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function RefundPage() {
  const policies = [
    {
      icon: CheckCircle,
      title: "Digital Programs",
      subtitle: "14-Day Money-Back Guarantee",
      content: `We offer a full refund on all digital training programs within 14 days of purchase. If you're not completely satisfied with your program, simply contact us for a full refund—no questions asked.`,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: AlertCircle,
      title: "1-on-1 Coaching",
      subtitle: "Unused Sessions Refundable",
      content: `For personal coaching packages, we offer refunds for unused sessions only. Once a session has been conducted, it is considered used and non-refundable. You may also transfer unused sessions to another person.`,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
    },
    {
      icon: AlertCircle,
      title: "Group Training",
      subtitle: "48-Hour Cancellation Policy",
      content: `Group training sessions can be cancelled or rescheduled up to 48 hours before the scheduled time for a full refund or credit. Cancellations within 48 hours are non-refundable but may be credited toward future sessions.`,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
    },
    {
      icon: XCircle,
      title: "Non-Refundable Items",
      subtitle: "Exceptions to Our Policy",
      content: `The following are not eligible for refunds: completed coaching sessions, personalized meal plans after delivery, custom workout programs after delivery, and any services that have been fully rendered.`,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Contact Us",
      description: `Send an email to ${CONTACT.email} with your order details and reason for refund.`,
    },
    {
      step: "2",
      title: "Review Process",
      description: "We'll review your request within 1-2 business days and respond with next steps.",
    },
    {
      step: "3",
      title: "Refund Issued",
      description: "Once approved, refunds are processed within 5-7 business days to your original payment method.",
    },
  ];

  return (
    <div className="min-h-screen font-sans text-white">
      <main className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
            <RefreshCcw className="h-4 w-4 text-white/80" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              Refund Policy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Refund Policy
          </h1>
          <p className="text-white/60 text-sm">
            Last updated: November 26, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-8"
        >
          <p className="text-white/80 leading-relaxed">
            Your satisfaction is our priority. We want you to be completely
            happy with your purchase. If for any reason you&apos;re not satisfied,
            we offer refunds according to the policies outlined below.
          </p>
        </motion.div>

        {/* Refund Policies */}
        <div className="space-y-4 mb-12">
          {policies.map((policy, idx) => {
            const Icon = policy.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className={`rounded-2xl border ${policy.borderColor} ${policy.bgColor} backdrop-blur-xl p-6 sm:p-8`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`rounded-xl border ${policy.borderColor} ${policy.bgColor} p-3`}>
                    <Icon className={`h-5 w-5 ${policy.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {policy.title}
                    </h2>
                    <p className={`text-sm ${policy.color}`}>{policy.subtitle}</p>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">
                  {policy.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* How to Request Refund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">How to Request a Refund</h2>
          </div>
          
          <div className="space-y-6">
            {steps.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Refund Processing</h2>
          </div>
          <p className="text-white/70 leading-relaxed">
            All refunds are processed to the original payment method used at checkout.
            Credit card refunds typically appear within 5-7 business days depending
            on your bank. PayPal refunds are usually instant. If you haven&apos;t received
            your refund after 10 business days, please contact us.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Need Help?</h2>
          </div>
          <p className="text-white/70 leading-relaxed">
            If you have any questions about our refund policy or need assistance
            with a refund request, please don&apos;t hesitate to contact us at{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              {CONTACT.email}
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
