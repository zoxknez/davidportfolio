import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { applyRateLimit } from "@/lib/rate-limit";
import { RATE_LIMITS, CONTACT } from "@/lib/constants";
import { ZodError } from "zod";
import { resend, FROM_EMAIL, sendContactResponseEmail } from "@/lib/email";
import { prisma } from "@/lib/db";

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

    // Save to database
    try {
      await prisma.contactSubmission.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.error("Failed to save contact submission to DB:", dbError);
      // Continue anyway - email sending is more important
    }

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: CONTACT.email,
        subject: `New Contact Form: ${validatedData.name}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="margin: 0 0 20px; color: #333;">New Contact Form Submission</h2>
    
    <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <p style="margin: 0 0 10px;"><strong>Name:</strong> ${validatedData.name}</p>
      <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
    </div>
    
    <div style="background: #f9f9f9; border-radius: 8px; padding: 20px;">
      <p style="margin: 0 0 10px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${validatedData.message}</p>
    </div>
    
    <p style="margin: 20px 0 0; color: #666; font-size: 14px;">
      Received at: ${new Date().toLocaleString()}
    </p>
  </div>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
    }

    // Send auto-response to user
    try {
      await sendContactResponseEmail(validatedData.email, validatedData.name);
    } catch (autoReplyError) {
      console.error("Failed to send auto-reply email:", autoReplyError);
    }

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

