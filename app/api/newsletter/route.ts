import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { applyRateLimit, rateLimiters } from "@/lib/rate-limit";
import { sendNewsletterWelcomeEmail } from "@/lib/email";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  source: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await applyRateLimit(request, {
      limit: 5,
      limiter: rateLimiters.standard,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    const body = await request.json();
    const { email, source, honeypot } = subscribeSchema.parse(body);

    // Honeypot check for bots
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      if (!existing.subscribed) {
        // Re-subscribe
        await prisma.newsletter.update({
          where: { email },
          data: { subscribed: true, source: source || existing.source },
        });
      } else {
        // Already subscribed
        return NextResponse.json({
          success: true,
          message: "You're already subscribed!",
        });
      }
    } else {
      // New subscriber
      await prisma.newsletter.create({
        data: { 
          email,
          source: source || "website",
        },
      });
    }

    // Send welcome email
    await sendNewsletterWelcomeEmail(email);

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Find subscriber and verify token
    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    // Simple token verification (hash of email + id)
    const expectedToken = Buffer.from(`${email}:${subscriber.id}`).toString("base64");
    if (token !== expectedToken) {
      return NextResponse.json(
        { error: "Invalid unsubscribe token" },
        { status: 400 }
      );
    }

    // Mark as unsubscribed
    await prisma.newsletter.update({
      where: { email },
      data: { subscribed: false },
    });

    return NextResponse.json({
      success: true,
      message: "You have been unsubscribed.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
