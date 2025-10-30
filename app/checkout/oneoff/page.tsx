"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  
  const program = slug ? getProgram(slug) : null;
  if (!program) return notFound();

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: would process payment
    alert(`Demo: Would process payment for ${program.title}`);
    router.push(`/programs/${program.slug}?purchased=true`);
  };

  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Button 
            variant="ghost" 
            className="h-9 sm:h-10 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 text-xs sm:text-sm text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10" 
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col gap-6 sm:gap-8">
          <div className={`transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">Complete Purchase</h1>
            <p className="mt-2 text-xs sm:text-sm text-white/70">{program.title}</p>
          </div>

          <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <span className="text-xs sm:text-sm text-white/70">Total</span>
              <span className="text-xl sm:text-2xl font-semibold text-white">${program.priceOneOff}.00</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="mb-2 block text-xs text-white/70">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-xs text-white/70">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="mb-2 block text-xs text-white/70">Card Number</label>
                <input
                  required
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: e.target.value.replace(/\D/g, "").slice(0, 16) })}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs text-white/70">Expiry</label>
                  <input
                    required
                    value={form.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
                      setForm({ ...form, expiry: val });
                    }}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-white/70">CVV</label>
                  <input
                    required
                    type="text"
                    value={form.cvv}
                    onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/10 backdrop-blur-sm"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
              
              <Button 
                type="submit"
                variant="ghost" 
                className="mt-6 w-full h-12 rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10"
              >
                Complete Purchase
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

