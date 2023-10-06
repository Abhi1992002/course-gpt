import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

const settingUrl = `${process.env.NEXTAUTH_URL}/settings`;

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // cancel at the billing portal
    if (userSubscription && userSubscription.stripeSubscriptionId) {
      // if user is subscribed and he clicked the portal so he send to manage page , so he can manage his subscription
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // if the user doesn't exist means subscribing first time
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email ?? "",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Course GPT",
              description: "unlimited course generation",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        // if the stripe payment is successful , it gives me userId in response also
        userId: session.user.id,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("{STIPE ERROR}", error);
    return new NextResponse("internal Server Error", { status: 500 });
  }
}
