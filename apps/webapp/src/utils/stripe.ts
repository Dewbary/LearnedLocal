import { env } from "@learnedlocal/config/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
});

export type StripeProductInfo = {
  title: string;
  description: string;
  amount: number;
  currency: string;
};

export type StripeProduct = {
  productId: string;
  priceId: string;
};

export const createExperienceAndPrice = async ({
  title,
  description,
  amount,
  currency,
}: StripeProductInfo): Promise<StripeProduct> => {
  const product = await stripe.products.create({ name: title, description });

  const price = await stripe.prices.create({
    unit_amount: amount,
    currency,
    product: product.id,
  });

  return { productId: product.id, priceId: price.id };
};
