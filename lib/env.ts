import { z } from "zod";

// Client-side environment variables schema
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .min(1, "NEXT_PUBLIC_SITE_URL is required"),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

// Server-side environment variables schema
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Add server-only env vars here when needed
  // DATABASE_URL: z.string().url(),
  // API_SECRET_KEY: z.string().min(32),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

// Parse client-side env vars
function getClientEnv() {
  // In production, NEXT_PUBLIC_SITE_URL is required
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set in production environment. " +
      "Please add it to your environment variables."
    );
  }

  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });

  if (!parsed.success) {
    console.error("❌ Invalid client environment variables:");
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    throw new Error("Invalid client environment variables. Check console for details.");
  }

  return parsed.data;
}

// Parse server-side env vars
function getServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  });

  if (!parsed.success) {
    console.error("❌ Invalid server environment variables:");
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    throw new Error("Invalid server environment variables. Check console for details.");
  }

  return parsed.data;
}

// Export validated env vars
export const clientEnv = getClientEnv();
export const serverEnv = typeof window === "undefined" ? getServerEnv() : ({} as z.infer<typeof serverEnvSchema>);

// Type exports for TypeScript
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Validation function to use in app
export function validateEnv() {
  try {
    getClientEnv();
    // Only validate server env on server side
    if (typeof window === "undefined") {
      getServerEnv();
    }
    console.log("✅ Environment variables validated successfully");
    return true;
  } catch (error) {
    console.error("❌ Environment validation failed:", error);
    return false;
  }
}

