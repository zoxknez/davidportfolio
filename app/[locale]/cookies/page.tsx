"use client";

import { motion } from "framer-motion";
import { Cookie, Shield, Settings, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function CookiesPage() {
  const sections = [
    {
      icon: Cookie,
      title: "What Are Cookies?",
      content: `Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.`,
    },
    {
      icon: Shield,
      title: "Essential Cookies",
      content: `These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account authentication. You cannot opt out of these cookies as they are essential for the site to work.`,
      list: [
        "Session management and authentication",
        "Security and fraud prevention",
        "Load balancing and performance",
        "User preferences and settings",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics Cookies",
      content: `We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience. These cookies collect information anonymously.`,
      list: [
        "Vercel Analytics for performance monitoring",
        "Page view and navigation tracking",
        "Error and crash reporting",
        "Feature usage analysis",
      ],
    },
    {
      icon: Settings,
      title: "Managing Cookies",
      content: `You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.`,
      list: [
        "Chrome: Settings → Privacy and Security → Cookies",
        "Firefox: Options → Privacy & Security → Cookies",
        "Safari: Preferences → Privacy → Cookies",
        "Edge: Settings → Privacy, search, and services → Cookies",
      ],
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
            <Cookie className="h-4 w-4 text-white/80" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              Cookie Policy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Cookie Policy
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
            This Cookie Policy explains how David Knežević Fitness uses cookies
            and similar technologies to recognize you when you visit our
            website. It explains what these technologies are and why we use
            them, as well as your rights to control our use of them.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white pt-2">
                    {section.title}
                  </h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-2 ml-4">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-sm flex items-start gap-2"
                      >
                        <span className="text-white/40 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mt-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Questions?</h2>
          <p className="text-white/70 leading-relaxed">
            If you have any questions about our use of cookies, please contact
            us at{" "}
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
