"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProgram } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { checkoutFormSchema, type CheckoutFormData } from "@/lib/validations";
import { ZodError } from "zod";
import { useMounted } from "@/hooks/use-mounted";
import { AnimatedBackground } from "@/components/animated-background";
import { BackButton } from "@/components/back-button";
import { inputStyles } from "@/lib/styles";
import { toast } from "@/lib/toast";
import { ShoppingCart, Lock, CreditCard, CheckCircle2 } from "lucide-react";

function CheckoutContent() {
  const mounted = useMounted();
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
      
      // Send to API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validated,
          programSlug: program.slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation, rate limit, or payment errors from API
        if (data.details && Array.isArray(data.details)) {
          const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
          data.details.forEach((err: { field: string; message: string }) => {
            const field = err.field as keyof CheckoutFormData;
            if (field) {
              newErrors[field] = err.message;
            }
          });
          setErrors(newErrors);
          toast.error("Payment validation failed", "Please check your card details and try again.");
        } else {
          toast.error("Payment failed", data.error || "Please try again or contact support.");
        }
        setIsSubmitting(false);
        return;
      }
      
      // Success! Show toast and redirect
      toast.success("Payment successful!", `You now have access to ${program.title}`);
      
      // Delay redirect slightly to show toast
      setTimeout(() => {
        router.push(`/programs/${program.slug}?purchased=true`);
      }, 500);
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
        toast.error("Validation failed", "Please check your form and try again.");
      } else {
        console.error("Checkout error:", error);
        toast.error("Unexpected error", "An unexpected error occurred. Please try again later.");
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
      <main className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-12 z-10">
        <BackButton label="← Back" onClick={() => router.back()} />

        <div className="mt-12 sm:mt-16 flex flex-col gap-8">
          {/* Header */}
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-6">
              <ShoppingCart className="h-4 w-4 text-white/80 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-white/90">Secure Checkout</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-white/70">
              You're one step away from accessing <span className="text-white font-semibold">{program.title}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className={`md:col-span-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 h-fit transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Program</span>
                  <span className="text-white font-medium">{program.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white">{program.weeks} weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Access</span>
                  <span className="text-white">Lifetime</span>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm text-white/70">Total</span>
                  <span className="text-3xl font-bold text-white">${program.priceOneOff}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Lock className="h-3 w-3" />
                  <span>Secure SSL encrypted payment</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className={`md:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Payment Details</h2>
                  <p className="text-xs text-white/60">All transactions are secure and encrypted</p>
                </div>
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
                  className={`${inputStyles.base} ${
                    errors.name ? inputStyles.error : inputStyles.default
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
                  className={`${inputStyles.base} ${
                    errors.email ? inputStyles.error : inputStyles.default
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
                  className={`${inputStyles.base} ${
                    errors.card ? inputStyles.error : inputStyles.default
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
                    className={`${inputStyles.base} ${
                      errors.expiry ? inputStyles.error : inputStyles.default
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
                    className={`${inputStyles.base} ${
                      errors.cvv ? inputStyles.error : inputStyles.default
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
                className="mt-6 w-full h-13 rounded-xl border-2 border-white/40 bg-white/20 text-white font-bold backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-white/30 hover:shadow-xl hover:shadow-white/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                aria-label="Complete Purchase"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Complete Secure Purchase
                    <CheckCircle2 className="h-5 w-5 ml-2 transition-transform group-hover:scale-110" />
                  </>
                )}
              </Button>

              {/* Security badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  <span>256-bit SSL</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>PCI Compliant</span>
                </div>
                <div>•</div>
                <div>Money-back guarantee</div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-dvh font-sans text-white relative overflow-hidden">
      <AnimatedBackground />

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
