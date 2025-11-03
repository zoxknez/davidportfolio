/**
 * Rate limiting utilities to prevent abuse
 * Uses in-memory LRU cache for request tracking
 */

type RateLimitConfig = {
  /**
   * Time window in milliseconds
   * @default 60000 (1 minute)
   */
  interval?: number;
  /**
   * Maximum number of unique tokens to track
   * @default 500
   */
  uniqueTokenPerInterval?: number;
};

type TokenBucket = {
  count: number;
  resetAt: number;
};

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */
export class RateLimiter {
  private cache = new Map<string, TokenBucket>();
  private interval: number;
  private maxTokens: number;

  constructor(config: RateLimitConfig = {}) {
    this.interval = config.interval || 60000; // 1 minute default
    this.maxTokens = config.uniqueTokenPerInterval || 500;
  }

  /**
   * Check if a request should be rate limited
   * @param limit - Maximum number of requests per interval
   * @param token - Unique identifier (usually IP address or user ID)
   * @returns Promise that resolves if allowed, rejects if rate limited
   */
  async check(limit: number, token: string): Promise<{ success: true }> {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const bucket = this.cache.get(token);

      // Clean up expired entries periodically
      if (this.cache.size > this.maxTokens) {
        this.cleanup(now);
      }

      if (!bucket || now > bucket.resetAt) {
        // Create new bucket or reset expired bucket
        this.cache.set(token, {
          count: 1,
          resetAt: now + this.interval,
        });
        resolve({ success: true });
      } else {
        // Increment existing bucket
        bucket.count += 1;

        if (bucket.count > limit) {
          const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
          reject({
            error: "Rate limit exceeded",
            retryAfter,
          });
        } else {
          resolve({ success: true });
        }
      }
    });
  }

  /**
   * Remove expired entries from cache
   */
  private cleanup(now: number) {
    const toDelete: string[] = [];
    
    for (const [token, bucket] of this.cache.entries()) {
      if (now > bucket.resetAt) {
        toDelete.push(token);
      }
    }

    toDelete.forEach((token) => this.cache.delete(token));
  }

  /**
   * Get current usage for a token
   */
  getUsage(token: string): { count: number; resetAt: number } | null {
    const bucket = this.cache.get(token);
    return bucket ? { count: bucket.count, resetAt: bucket.resetAt } : null;
  }

  /**
   * Reset rate limit for a specific token
   */
  reset(token: string): void {
    this.cache.delete(token);
  }

  /**
   * Clear all rate limit data
   */
  clearAll(): void {
    this.cache.clear();
  }
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  
  if (realIp) {
    return realIp;
  }
  
  return "unknown";
}

// Pre-configured rate limiters for different use cases
export const rateLimiters = {
  // Strict: For sensitive operations (login, password reset)
  strict: new RateLimiter({ interval: 60000, uniqueTokenPerInterval: 500 }),
  
  // Standard: For form submissions (contact, checkout)
  standard: new RateLimiter({ interval: 60000, uniqueTokenPerInterval: 1000 }),
  
  // Lenient: For API reads
  lenient: new RateLimiter({ interval: 60000, uniqueTokenPerInterval: 2000 }),
};

/**
 * Helper function to apply rate limiting to API routes
 * 
 * @example
 * ```ts
 * export async function POST(request: Request) {
 *   const rateLimitResult = await applyRateLimit(request, { limit: 5 });
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response;
 *   }
 *   // ... rest of your API logic
 * }
 * ```
 */
export async function applyRateLimit(
  request: Request,
  options: {
    limit: number;
    limiter?: RateLimiter;
  }
): Promise<{ success: true } | { success: false; response: Response }> {
  const limiter = options.limiter || rateLimiters.standard;
  const ip = getClientIp(request);

  try {
    await limiter.check(options.limit, ip);
    return { success: true };
  } catch (error) {
    const retryAfter = (error as { retryAfter?: number }).retryAfter || 60;
    
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Too many requests",
          message: "You have exceeded the rate limit. Please try again later.",
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": retryAfter.toString(),
          },
        }
      ),
    };
  }
}

