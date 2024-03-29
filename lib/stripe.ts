import Stripe from "stripe";

// define the stipe func and creating a new stripe transaction
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
