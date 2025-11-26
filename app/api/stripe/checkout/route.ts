import { NextRequest, NextResponse } from "next/server";
import { stripe, formatAmountForStripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["program", "coaching"]),
      quantity: z.number().default(1),
    })
  ),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Please sign in to continue" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = checkoutSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { items, successUrl, cancelUrl } = validatedData.data;
    const lineItems: Array<{
      price_data: {
        currency: string;
        product_data: {
          name: string;
          description?: string;
          images?: string[];
        };
        unit_amount: number;
      };
      quantity: number;
    }> = [];
    const orderItems: Array<{
      programId?: string;
      packageId?: string;
      name: string;
      price: number;
      quantity: number;
    }> = [];

    // Fetch all items and build line items
    for (const item of items) {
      if (item.type === "program") {
        const program = await prisma.program.findUnique({
          where: { id: item.id },
        });

        if (!program) {
          return NextResponse.json(
            { error: `Program not found: ${item.id}` },
            { status: 404 }
          );
        }

        lineItems.push({
          price_data: {
            currency: program.currency.toLowerCase(),
            product_data: {
              name: program.name,
              description: program.shortDescription || program.description.substring(0, 200),
              images: program.thumbnail ? [program.thumbnail] : undefined,
            },
            unit_amount: formatAmountForStripe(Number(program.price), program.currency),
          },
          quantity: item.quantity,
        });

        orderItems.push({
          programId: program.id,
          name: program.name,
          price: Number(program.price),
          quantity: item.quantity,
        });
      } else if (item.type === "coaching") {
        const coachingPackage = await prisma.coachingPackage.findUnique({
          where: { id: item.id },
        });

        if (!coachingPackage) {
          return NextResponse.json(
            { error: `Coaching package not found: ${item.id}` },
            { status: 404 }
          );
        }

        lineItems.push({
          price_data: {
            currency: coachingPackage.currency.toLowerCase(),
            product_data: {
              name: coachingPackage.name,
              description: coachingPackage.description.substring(0, 200),
            },
            unit_amount: formatAmountForStripe(Number(coachingPackage.price), coachingPackage.currency),
          },
          quantity: item.quantity,
        });

        orderItems.push({
          packageId: coachingPackage.id,
          name: coachingPackage.name,
          price: Number(coachingPackage.price),
          quantity: item.quantity,
        });
      }
    }

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create pending order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        orderNumber,
        status: "PENDING",
        subtotal,
        total: subtotal,
        items: {
          create: orderItems,
        },
      },
    });

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: session.user.email,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        userId: session.user.id,
      },
      success_url: successUrl || `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/checkout/cancel`,
      billing_address_collection: "required",
      allow_promotion_codes: true,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripePaymentIntentId: stripeSession.id },
    });

    return NextResponse.json({
      sessionId: stripeSession.id,
      url: stripeSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
