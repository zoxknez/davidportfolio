"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { checkoutFormSchema, type CheckoutFormData } from "@/lib/validations";
import { ZodError } from "zod";

function CheckoutContent() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CheckoutFormData & { card: string }>({ 
    name: "", 
    email: "", 
    card: "", 
    expiry: "", 
    cvv: "" 
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  
  const program = slug ? getProgram(slug) : null;
  if (!program) return notFound();

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Format card number without spaces for validation
      const cardNumber = form.card.replace(/\s/g, "");
      const validated = checkoutFormSchema.parse({
        ...form,
        card: cardNumber,
      });
      
      // Demo: would process payment
      console.log("Payment data:", validated);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push(`/programs/${program.slug}?purchased=true`);
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof CheckoutFormData;
          if (field) {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ card: "An error occurred. Please try again." });
      }
      setIsSubmitting(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  return (
    <>
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
                <label htmlFor="checkout-name" className="mb-2 block text-xs text-white/70">
                  Name
                </label>
                <input
                  id="checkout-name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  aria-label="Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "checkout-name-error" : undefined}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.name 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p id="checkout-name-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="checkout-email" className="mb-2 block text-xs text-white/70">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "checkout-email-error" : undefined}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.email 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p id="checkout-email-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="checkout-card" className="mb-2 block text-xs text-white/70">
                  Card Number
                </label>
                <input
                  id="checkout-card"
                  type="text"
                  inputMode="numeric"
                  value={form.card}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value.replace(/\D/g, ""));
                    setForm({ ...form, card: formatted });
                    if (errors.card) setErrors({ ...errors, card: undefined });
                  }}
                  aria-label="Card Number"
                  aria-invalid={!!errors.card}
                  aria-describedby={errors.card ? "checkout-card-error" : undefined}
                  className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm ${
                    errors.card 
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                      : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10"
                  }`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.card && (
                  <p id="checkout-card-error" className="mt-1 text-xs text-red-400" role="alert">
                    {errors.card}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-expiry" className="mb-2 block text-xs text-white/70">
                    Expiry
                  </label>
                  <input
                    id="checkout-expiry"
                    type="text"
                    inputMode="numeric"
                    value={form.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
                      setForm({ ...form, expiry: val });
                      if (errors.expiry) setErrors({ ...errors, expiry: undefined });
                    }}
                    aria-label="Card Expiry"
                    aria-invalid={!!errors.expiry}
                    aria-describedby={errors.expiry ? "checkout-expiry-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm ${
                      errors.expiry 
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                        : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10"
                    }`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <p id="checkout-expiry-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.expiry}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="checkout-cvv" className="mb-2 block text-xs text-white/70">
                    CVV
                  </label>
                  <input
                    id="checkout-cvv"
                    type="text"
                    inputMode="numeric"
                    value={form.cvv}
                    onChange={(e) => {
                      setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) });
                      if (errors.cvv) setErrors({ ...errors, cvv: undefined });
                    }}
                    aria-label="Card CVV"
                    aria-invalid={!!errors.cvv}
                    aria-describedby={errors.cvv ? "checkout-cvv-error" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-all duration-300 backdrop-blur-sm ${
                      errors.cvv 
                        ? "border-red-500/50 bg-red-500/10 focus:border-red-500/70 focus:bg-red-500/15" 
                        : "border-white/20 bg-white/5 focus:border-white/40 focus:bg-white/10"
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p id="checkout-cvv-error" className="mt-1 text-xs text-red-400" role="alert">
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit"
                variant="ghost"
                disabled={isSubmitting}
                className="mt-6 w-full h-12 rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Complete Purchase"
              >
                {isSubmitting ? "Processing..." : "Complete Purchase"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 animated-gradient" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animated-glow" style={{ animationDelay: "1.5s" }} />

      <Suspense fallback={
        <main className="relative mx-auto w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-12 z-10 flex items-center justify-center min-h-dvh">
          <div className="text-white/70">Loading...</div>
        </main>
      }>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
