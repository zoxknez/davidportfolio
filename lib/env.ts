import { z } from "zod";

// Client-side environment variables schema
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("https://davidfitness.com"),
});

// Server-side environment variables schema
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Add server-only env vars here when needed
  // DATABASE_URL: z.string().url(),
  // API_SECRET_KEY: z.string().min(32),
});

// Parse client-side env vars
function getClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!parsed.success) {
    console.error("Invalid client environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid client environment variables");
  }

  return parsed.data;
}

// Parse server-side env vars
function getServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    console.error("Invalid server environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

// Export validated env vars
export const clientEnv = getClientEnv();
export const serverEnv = getServerEnv();

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
    return true;
  } catch (error) {
    console.error("Environment validation failed:", error);
    return false;
  }
}

