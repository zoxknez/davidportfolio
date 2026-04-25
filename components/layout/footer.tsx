"use client";

import { Link } from "@/lib/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ROUTES, SITE, SOCIAL_LINKS, CONTACT } from "@/lib/constants";
import { useTranslations } from "next-intl";
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
import type { CSSProperties } from "react";
import { toast } from "sonner";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: SOCIAL_LINKS.instagram.url },
  { name: "Threads", icon: AtSign, href: SOCIAL_LINKS.threads.url },
  { name: "YouTube", icon: Youtube, href: SOCIAL_LINKS.youtube.url },
  { name: "Facebook", icon: Facebook, href: SOCIAL_LINKS.facebook.url },
];

export function Footer() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    training: {
      title: t("common.training"),
      links: [
        { name: t("navigation.oneOnOne"), href: ROUTES.coaching.oneOnOne },
        { name: t("navigation.groupClasses"), href: ROUTES.coaching.group },
        { name: t("common.programs"), href: ROUTES.programs },
        { name: "Find Your Program", href: ROUTES.quiz },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { name: t("common.media"), href: ROUTES.media },
        { name: t("common.news"), href: ROUTES.news },
        { name: "About David", href: "/about" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    legal: {
      title: t("footer.legal"),
      links: [
        { name: t("footer.privacy"), href: "/privacy" },
        { name: t("footer.terms"), href: "/terms" },
        { name: t("footer.cookies"), href: "/cookies" },
        { name: t("footer.refund"), href: "/refund" },
      ],
    },
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Welcome to the community!", {
      description: "Check your email for a special welcome offer.",
    });
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <footer className="relative border-t border-white/10 bg-[rgba(6,8,12,0.96)]">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div
            className="tactical-card grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.9fr_1fr] lg:items-center"
            style={{ "--glass-accent": "oklch(0.79 0.16 170)" } as CSSProperties}
          >
            <div className="text-center lg:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                className="mb-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
              >
                Join the Elite Training Community
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                className="max-w-md leading-7 text-white/70"
              >
                Get exclusive workout tips, nutrition advice, and early access to new programs.
              </motion.p>
            </div>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              onSubmit={handleSubscribe}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/45 transition-colors duration-300 peer-focus:text-white/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="peer h-13 w-full rounded-lg border border-white/15 bg-white/[0.08] pl-12 pr-4 text-white transition-all duration-300 placeholder:text-white/45 focus:border-[oklch(0.79_0.16_170_/_0.7)] focus:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[oklch(0.79_0.16_170_/_0.3)] hover:border-white/25"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing}
                className="group h-13 rounded-lg bg-[oklch(0.66_0.22_31)] px-7 font-bold text-white shadow-xl shadow-[oklch(0.66_0.22_31_/_0.35)] hover:bg-[oklch(0.72_0.22_31)] hover:shadow-2xl hover:shadow-[oklch(0.66_0.22_31_/_0.5)] border border-[oklch(0.66_0.22_31_/_0.3)]"
              >
                {isSubscribing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[oklch(0.66_0.22_31_/_0.35)] bg-[oklch(0.66_0.22_31_/_0.16)]">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-xl font-bold text-white">{SITE.shortName}</span>
                <span className="block text-sm text-white/50">Fitness Coach</span>
              </div>
            </Link>
            
            <p className="text-white/60 mb-6 max-w-sm">
              {t("footer.description")}
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
                <span>{t("footer.location")}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] text-white/65 transition-all duration-300 hover:border-[oklch(0.79_0.16_170_/_0.5)] hover:bg-white/[0.14] hover:text-white hover:shadow-lg hover:shadow-[oklch(0.79_0.16_170_/_0.2)] hover:-translate-y-1"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
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
              <h4 className="mb-4 text-sm font-bold uppercase text-white/80">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
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
              © {currentYear} {SITE.shortName}. {t("footer.copyright")}
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
