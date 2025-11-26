import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${subscription.id} ${event.type}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${subscription.id} canceled`);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${invoice.id} paid`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${invoice.id} payment failed`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    console.error("No orderId in session metadata");
    return;
  }

  // Update order status
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "COMPLETED",
      stripePaymentIntentId: session.payment_intent as string,
      stripeCustomerId: session.customer as string,
      billingEmail: session.customer_details?.email,
      billingName: session.customer_details?.name,
      billingAddress: session.customer_details?.address
        ? JSON.parse(JSON.stringify(session.customer_details.address))
        : null,
    },
    include: {
      items: true,
      user: true,
    },
  });

  // Grant access to purchased programs
  for (const item of order.items) {
    if (item.programId) {
      // Create program progress entry for the user
      await prisma.programProgress.upsert({
        where: {
          userId_programId: {
            userId: order.userId,
            programId: item.programId,
          },
        },
        update: {},
        create: {
          userId: order.userId,
          programId: item.programId,
          currentWeek: 1,
          currentDay: 1,
        },
      });

      // Update program enrollment count
      await prisma.program.update({
        where: { id: item.programId },
        data: { enrollmentCount: { increment: 1 } },
      });
    }
  }

  // TODO: Send confirmation email
  console.log(`Order ${order.orderNumber} completed for user ${order.user.email}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    return;
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: "FAILED" },
  });

  // TODO: Send payment failed email
  console.log(`Payment failed for order ${orderId}`);
}
