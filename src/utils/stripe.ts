const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
