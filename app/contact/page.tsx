"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            asChild
          >
            <a href="/">← Home</a>
          </Button>
        </div>
        
        <div className="mt-12 sm:mt-0 pt-0">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            Get in touch
          </h1>
          <p className={`mt-2 text-xs sm:text-sm text-white/70 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Let's discuss your training goals.
          </p>
        </div>
        {mounted && (
          <form className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }} onSubmit={(e) => { e.preventDefault(); alert("Demo: Form would send"); }}>
            <div className="grid gap-4">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="h-12 rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="h-12 rounded-xl border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Message"
                rows={5}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 resize-none backdrop-blur-sm"
              />
              <Button 
                variant="ghost" 
                type="submit" 
                className="w-full h-12 rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10"
              >
                Send
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
