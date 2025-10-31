"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Instagram, Facebook, MessageSquare } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { ZodError } from "zod";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "david@fitnesscoach.com",
      href: "mailto:david@fitnesscoach.com",
      color: "text-white/90",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.davidfitness.com",
      href: "https://www.davidfitness.com",
      color: "text-white/90",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@davidfitness",
      href: "https://instagram.com/davidfitness",
      color: "text-white/90",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "David Fitness Coach",
      href: "https://facebook.com/davidfitness",
      color: "text-white/90",
    },
  ];

  return (
    <div className="h-screen font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto h-full w-full max-w-2xl flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-8 z-10 overflow-y-auto">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <Link href="/">← Home</Link>
          </Button>
        </div>
        
        <div className="mt-12 sm:mt-4 pt-0">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            Get in touch
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Let&apos;s discuss your training goals.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {contactInfo.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                    <Icon className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/60 uppercase tracking-wide mb-1">{contact.label}</div>
                    <div className={`text-sm font-medium truncate ${contact.color}`}>{contact.value}</div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        {mounted && (
          <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-white/80" />
              <h2 className="text-lg font-semibold text-white">Send a message</h2>
            </div>
            <form 
              onSubmit={async (e) => { 
                e.preventDefault();
                setIsSubmitting(true);
                setErrors({});
                setSubmitSuccess(false);

                try {
                  const validated = contactFormSchema.parse(form);
                  // Here you would send to your API
                  console.log("Form data:", validated);
                  
                  // Simulate API call
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  
                  setSubmitSuccess(true);
                  setForm({ name: "", email: "", message: "" });
                } catch (error) {
                  if (error instanceof ZodError) {
                    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
                    error.issues.forEach((err) => {
                      const field = err.path[0] as keyof ContactFormData;
                      if (field) {
                        newErrors[field] = err.message;
                      }
                    });
                    setErrors(newErrors);
                  } else {
                    setErrors({ message: "An error occurred. Please try again." });
                  }
                } finally {
                  setIsSubmitting(false);
                }
              }} 
              className="grid gap-5"
            >
              {submitSuccess && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm p-4">
                  <p className="text-sm text-green-400 font-medium">✓ Message sent successfully!</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="contact-name" className="block text-sm font-medium text-white/80">
                  Name
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Your full name"
                  aria-label="Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full h-12 rounded-lg border px-4 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.name 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="your.email@example.com"
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full h-12 rounded-lg border px-4 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.email 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-medium text-white/80">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Tell me about your fitness goals..."
                  rows={6}
                  aria-label="Message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 resize-none backdrop-blur-sm ${
                    errors.message 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-lg border border-white/10 bg-white/5 text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
