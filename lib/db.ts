// Prisma 7 - Import from generated client location
import { PrismaClient, Prisma } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// For Prisma 7, we need to use a driver adapter
// During build time, we create a mock client if DATABASE_URL is not set
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    // During build time, return a client that will fail at runtime
    // This prevents build errors when DATABASE_URL is not set
    console.warn("DATABASE_URL not set - Prisma client will not work until it's configured");
    // Create with a placeholder that won't actually connect
    const adapter = new PrismaPg({ connectionString: "postgresql://placeholder:placeholder@localhost:5432/placeholder" });
    return new PrismaClient({ adapter });
  }
  
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

// Re-export Prisma namespace for types
export { Prisma };
