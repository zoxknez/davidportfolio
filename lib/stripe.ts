import Stripe from "stripe";

// Create Stripe instance lazily to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backwards compatibility, export stripe getter
export const stripe = new Proxy({} as Stripe, {
  get: (_, prop) => {
    const instance = getStripe();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

// Helper to format amount for Stripe (converts dollars to cents)
export function formatAmountForStripe(amount: number, currency: string): number {
  const zeroDecimalCurrencies = [
    "BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA",
    "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF",
  ];

  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }
  
  return Math.round(amount * 100);
}

// Helper to format Stripe amount back to display amount
export function formatStripeAmount(amount: number, currency: string): number {
  const zeroDecimalCurrencies = [
    "BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA",
    "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF",
  ];

  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return amount;
  }
  
  return amount / 100;
}
