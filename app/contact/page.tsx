"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Instagram, Facebook, MessageSquare, ArrowRight } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { ZodError } from "zod";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { inputStyles, buttonStyles } from "@/lib/styles";
import { toast } from "@/lib/toast";

export default function ContactPage() {
  const mounted = useMounted();
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <AnimatedBackground />

      <main className="relative mx-auto h-full w-full max-w-2xl flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-8 z-10 overflow-y-auto">
        <BackButton />
        
        <div className="mt-12 sm:mt-4 pt-0">
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <MessageSquare className="h-4 w-4 text-white/80 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/90">Start Your Journey</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl">
              Ready to transform? Let&apos;s discuss your training goals and find the perfect program for you.
            </p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactInfo.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="animate-slide-up"
                style={{ animationDelay: `${0.15 + idx * 0.05}s` }}
              >
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-1"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
                  
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white/60 uppercase tracking-wide mb-1 font-medium">{contact.label}</div>
                      <div className={`text-sm font-semibold truncate ${contact.color} transition-colors group-hover:text-white`}>{contact.value}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-1" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        {mounted && (
          <div className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-700 hover:border-white/20 hover:bg-white/10 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Send a Message</h2>
                <p className="text-xs text-white/60">We'll get back to you within 24 hours</p>
              </div>
            </div>
            <form 
              onSubmit={async (e) => { 
                e.preventDefault();
                setIsSubmitting(true);
                setErrors({});

                try {
                  // Validate form data on client side first
                  const validated = contactFormSchema.parse(form);
                  
                  // Send to API with loading toast
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(validated),
                  });

                  const data = await response.json();

                  if (!response.ok) {
                    // Handle validation or rate limit errors from API
                    if (data.details && Array.isArray(data.details)) {
                      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
                      data.details.forEach((err: { field: string; message: string }) => {
                        const field = err.field as keyof ContactFormData;
                        if (field) {
                          newErrors[field] = err.message;
                        }
                      });
                      setErrors(newErrors);
                      toast.error("Validation failed", "Please check your form and try again.");
                    } else {
                      toast.error("Failed to send message", data.error || "Please try again later.");
                    }
                    return;
                  }
                  
                  // Success!
                  toast.success("Message sent!", "Thank you for contacting us. We'll get back to you soon.");
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
                    toast.error("Validation failed", "Please check your form and try again.");
                  } else {
                    console.error("Contact form error:", error);
                    toast.error("Unexpected error", "An unexpected error occurred. Please try again later.");
                  }
                } finally {
                  setIsSubmitting(false);
                }
              }} 
              className="grid gap-5"
            >
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
                  className={`${inputStyles.base} h-12 rounded-lg ${
                    errors.name ? inputStyles.error : inputStyles.default
                  } focus:ring-2 focus:ring-white/20`}
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
                  className={`${inputStyles.base} h-12 rounded-lg ${
                    errors.email ? inputStyles.error : inputStyles.default
                  } focus:ring-2 focus:ring-white/20`}
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
                  className={`${inputStyles.base} rounded-lg resize-none ${
                    errors.message ? inputStyles.error : inputStyles.default
                  } focus:ring-2 focus:ring-white/20`}
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
                className={`w-full h-12 rounded-lg ${buttonStyles.primary.replace("rounded-full", "rounded-lg")} disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
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
