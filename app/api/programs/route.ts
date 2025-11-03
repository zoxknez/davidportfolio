import { NextRequest, NextResponse } from "next/server";
import { programs } from "@/data/programs";
import { applyRateLimit, rateLimiters } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/constants";

/**
 * GET /api/programs
 * Retrieve all training programs
 * 
 * Query parameters:
 * - level: Filter by level (beginner, intermediate, advanced)
 * - minWeeks: Minimum program duration in weeks
 * - maxWeeks: Maximum program duration in weeks
 * - daysPerWeek: Filter by days per week
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting (60 requests per minute for reads)
    const rateLimitResult = await applyRateLimit(request, {
      limit: RATE_LIMITS.api.read,
      limiter: rateLimiters.lenient,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const minWeeks = searchParams.get("minWeeks");
    const maxWeeks = searchParams.get("maxWeeks");
    const daysPerWeek = searchParams.get("daysPerWeek");

    // Filter programs based on query parameters
    let filteredPrograms = programs;

    if (level) {
      filteredPrograms = filteredPrograms.filter(
        (p) => p.level === level
      );
    }

    if (minWeeks) {
      const min = parseInt(minWeeks, 10);
      if (!isNaN(min)) {
        filteredPrograms = filteredPrograms.filter((p) => p.weeks >= min);
      }
    }

    if (maxWeeks) {
      const max = parseInt(maxWeeks, 10);
      if (!isNaN(max)) {
        filteredPrograms = filteredPrograms.filter((p) => p.weeks <= max);
      }
    }

    if (daysPerWeek) {
      const days = parseInt(daysPerWeek, 10);
      if (!isNaN(days)) {
        filteredPrograms = filteredPrograms.filter((p) => p.daysPerWeek === days);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: filteredPrograms,
        count: filteredPrograms.length,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("❌ Programs API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve programs",
      },
      { status: 500 }
    );
  }
}

