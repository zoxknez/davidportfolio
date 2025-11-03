import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { applyRateLimit } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/constants";
import { ZodError } from "zod";

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 requests per minute)
    const rateLimitResult = await applyRateLimit(request, {
      limit: RATE_LIMITS.contact,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // TODO: Implement actual email sending logic
    // Example using a service like SendGrid, Resend, or Nodemailer:
    // await sendEmail({
    //   to: CONTACT.email,
    //   from: validatedData.email,
    //   subject: `Contact form submission from ${validatedData.name}`,
    //   text: validatedData.message,
    // });

    // For now, just log the data (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Contact form submission:", validatedData);
    }

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Log unexpected errors
    console.error("❌ Contact API error:", error);

    // Return generic error message (don't expose internal details)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

