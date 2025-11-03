import { NextRequest, NextResponse } from "next/server";
import { getProgram } from "@/data/programs";
import { applyRateLimit, rateLimiters } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/constants";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/programs/[slug]
 * Retrieve a specific training program by slug
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Apply rate limiting (60 requests per minute for reads)
    const rateLimitResult = await applyRateLimit(request, {
      limit: RATE_LIMITS.api.read,
      limiter: rateLimiters.lenient,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Get slug from params
    const { slug } = await context.params;

    // Validate slug format
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid program slug",
        },
        { status: 400 }
      );
    }

    // Retrieve program
    const program = getProgram(slug);

    if (!program) {
      return NextResponse.json(
        {
          success: false,
          error: "Program not found",
          message: `No program found with slug: ${slug}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: program,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("❌ Program API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve program",
      },
      { status: 500 }
    );
  }
}

