"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES, SITE, SOCIAL_LINKS, CONTACT } from "@/lib/constants";
import {
  Dumbbell,
  Instagram,
  Facebook,
  AtSign,
  Youtube,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const footerLinks = {
  training: {
    title: "Training",
    links: [
      { name: "1-on-1 Coaching", href: ROUTES.coaching.oneOnOne },
      { name: "Group Classes", href: ROUTES.coaching.group },
      { name: "All Programs", href: ROUTES.programs },
      { name: "Find Your Program", href: ROUTES.quiz },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Media Gallery", href: ROUTES.media },
      { name: "Latest News", href: ROUTES.news },
      { name: "About David", href: "/about" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
    ],
  },
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: SOCIAL_LINKS.instagram.url },
  { name: "Threads", icon: AtSign, href: SOCIAL_LINKS.threads.url },
  { name: "YouTube", icon: Youtube, href: SOCIAL_LINKS.youtube.url },
  { name: "Facebook", icon: Facebook, href: SOCIAL_LINKS.facebook.url },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Welcome to the community! 🎉", {
      description: "Check your email for a special welcome offer.",
    });
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
              >
                Join the Elite Training Community
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/60 max-w-md"
              >
                Get exclusive workout tips, nutrition advice, and early access to new programs.
              </motion.p>
            </div>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
            >
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing}
                className="h-12 px-6 bg-white text-black hover:bg-white/90 font-semibold rounded-xl group"
              >
                {isSubscribing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-xl font-bold text-white">{SITE.shortName}</span>
                <span className="block text-sm text-white/50">Fitness Coach</span>
              </div>
            </Link>
            
            <p className="text-white/60 mb-6 max-w-sm">
              From a small Serbian village to Dubai&apos;s elite fitness scene. Transform your body and mind with personalized coaching and a coach who truly understands the journey.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="h-4 w-4" />
                <span>Dubai, UAE • Serbia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.values(footerLinks).map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center sm:text-left">
              © {currentYear} {SITE.shortName}. All rights reserved.
            </p>
            <p className="text-sm text-white/50 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for fitness enthusiasts
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </footer>
  );
}
