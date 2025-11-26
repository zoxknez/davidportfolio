import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { applyRateLimit, rateLimiters } from "@/lib/rate-limit";
import { sendPasswordResetEmail } from "@/lib/email";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    // Strict rate limiting - max 3 attempts per minute
    const rateLimitResult = await applyRateLimit(request, {
      limit: 3,
      limiter: rateLimiters.strict,
    });

    if (!rateLimitResult.success) {
      return rateLimitResult.response;
    }

    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, you will receive a reset link.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 1 hour
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Delete any existing tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
      },
    });

    // Save new token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires,
      },
    });

    // Send reset email using template
    const result = await sendPasswordResetEmail(
      email,
      user.name || "there",
      resetToken
    );

    if (!result.success) {
      console.error("Failed to send password reset email:", result.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists, you will receive a reset link.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
