import { NextRequest, NextResponse } from "next/server";
import { checkoutFormSchema } from "@/lib/validations";
import { getProgram } from "@/data/programs";
import { applyRateLimit, rateLimiters } from "@/lib/rate-limit";
import { RATE_LIMITS } from "@/lib/constants";
import { ZodError } from "zod";

/**
 * POST /api/checkout
 * Process program purchase checkout
 * 
 * Request body:
 * - name: Customer name
 * - email: Customer email
 * - card: Card number
 * - expiry: Card expiry (MM/YY)
 * - cvv: Card CVV
 * - programSlug: Program slug to purchase
 */
export async function POST(request: NextRequest) {
  try {
    // Apply strict rate limiting (3 requests per minute)
    const rateLimitResult = await applyRateLimit(request, {
      limit: RATE_LIMITS.checkout,
      limiter: rateLimiters.strict,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate program slug
    if (!body.programSlug || typeof body.programSlug !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid program slug",
        },
        { status: 400 }
      );
    }

    // Verify program exists
    const program = getProgram(body.programSlug);
    if (!program) {
      return NextResponse.json(
        {
          success: false,
          error: "Program not found",
        },
        { status: 404 }
      );
    }

    // Validate checkout form data
    const validatedData = checkoutFormSchema.parse({
      name: body.name,
      email: body.email,
      card: body.card,
      expiry: body.expiry,
      cvv: body.cvv,
    });

    // TODO: Implement actual payment processing
    // Example using Stripe:
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: program.priceOneOff * 100, // Convert to cents
    //   currency: 'usd',
    //   payment_method_types: ['card'],
    //   receipt_email: validatedData.email,
    //   metadata: {
    //     programSlug: program.slug,
    //     customerName: validatedData.name,
    //   },
    // });

    // For now, simulate payment processing
    if (process.env.NODE_ENV === "development") {
      console.log("💳 Checkout submission:", {
        customer: validatedData.name,
        email: validatedData.email,
        program: program.title,
        amount: program.priceOneOff,
      });
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: Send confirmation email
    // TODO: Grant access to program
    // TODO: Store purchase in database

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        data: {
          programSlug: program.slug,
          programTitle: program.title,
          amount: program.priceOneOff,
          customerEmail: validatedData.email,
        },
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
    console.error("❌ Checkout API error:", error);

    // Return generic error (don't expose payment details)
    return NextResponse.json(
      {
        success: false,
        error: "Payment processing failed. Please try again or contact support.",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/checkout
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

