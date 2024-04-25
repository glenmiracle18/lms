import crypto from "crypto";

export async function POST(req) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8",
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    console.log(body);

    // Logic according to event
    if (eventType === "order_created") {
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// import Stripe from "stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// import { stripe } from "@/lib/stripe";
// import { db } from "@/lib/db";
// import { NextServer } from "next/dist/server/next";

// export async function POST(req: Request) {
//   const body = await req.text();
//   const signature = headers().get("Stripe-Signature") as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!,
//     );
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const userId = session?.metadata?.userId;
//   const courseId = session?.metadata?.courseId;

//   if (event.type === "checkout.session.completed") {
//     if (!userId || !courseId) {
//       return new NextResponse(`Webhook Error: Missing metadata`, {
//         status: 400,
//       });
//     }

//     await db.purchase.create({
//       data: {
//         courseId: courseId,
//         userId: userId,
//       },
//     });
//   } else {
//     return new NextResponse(
//       `Webhook Error: Unhandled event type ${event.type}`,
//       { status: 200 },
//     );
//   }

//   return new NextResponse(null, { status: 200 });
// }
