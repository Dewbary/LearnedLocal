import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
// import { appRouter } from "../../root";

const stripe = new Stripe(
  "sk_test_51N0waCHgsmlEnOHEwFa8vBz9qZheV9uzb7zz3dlrWdhIDOYAfGdsNvSWYvzB8drOFiQmQ3w5QSZeS4kD4uWuJ2YA00WpyK420F",
  {
    apiVersion: "2022-11-15",
  }
);

const getStripe = async () => {
  const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
  );
  return stripe;
};

describe("Stripe", () => {
  it("should create a checkout session", async () => {
    // const ctx = createInnerTRPCContext({
    //   userId: "1",
    // });
    // const caller = appRouter.createCaller({ userId: "1", prisma: prismaMock });
    // caller.payment.createCheckoutSession({
    //   experienceId: 1,
    //   availabilityId: 1,
    //   userId: "usr1",
    //   registrantFirstName: "Brendan",
    //   registrantLastName: "Dewberry",
    //   partySize: 12,
    //   email: "test@gmail.com",
    //   phone: "4444444444",
    //   textNotifications: true,
    // });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      metadata: {
        userId: "123",
        registrantFirstName: "Test",
        registrantLastName: "User",
        partySize: 1,
        email: "test@gmail.com",
        phone: "444-444-4444",
        experienceId: "exp1",
        availabilityId: "avail1",
        textNotifications: "true",
      },
    });
    expect(session).toHaveProperty("id");
    expect(session.mode).toBe("payment");
    expect(session.payment_method_types[0]).toBe("card");
    expect(session.metadata).toHaveProperty("userId");
    expect(session.metadata).toHaveProperty("registrantFirstName");
    expect(session.metadata).toHaveProperty("registrantLastName");
    expect(session.metadata).toHaveProperty("partySize");
    expect(session.metadata).toHaveProperty("email");
    expect(session.metadata).toHaveProperty("phone");
    expect(session.metadata).toHaveProperty("experienceId");
    expect(session.metadata).toHaveProperty("availabilityId");
    expect(session.metadata).toHaveProperty("textNotifications");
    const stripe2 = await getStripe();
    if (stripe2) {
      stripe2.redirectToCheckout({ sessionId: session.id });
    }
  });
});
