import { test, beforeAll, afterEach, afterAll, expect } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createCheckoutSessionObject } from "@learnedlocal/api/utils/stripeUtils";
import type { CheckoutMetadata } from "@learnedlocal/api/routers/types";
import type { Experience } from "@learnedlocal/db";

const testExperience: Experience = {
  id: 1,
  authorId: "author-1",
  firstName: "Brendan",
  lastName: "Dewberry",
  email: "test@gmail.com",
  phone: "444-444-4444",
  title: "Test Experience",
  description: "This is a test experience",
  price: 1.99,
  free: false,
  timeline: "This is a test timeline",
  city: "Test City",
  location: {},
  locationDescription: "location description",
  qualifications: "qualifications",
  provided: "provided",
  guestRequirements: "guest requirements",
  minAge: 12,
  activityLevel: "activity level",
  skillLevel: "skill level",
  maxAttendees: 40,
  createdAt: new Date(),
  updatedAt: new Date(),
  profileImage: null,
  photos: [],
  slugId: "test-experience",
  stripeProductId: "prod_123",
  stripePriceId: "price_123",
  verified: true,
  isFutureExperience: false,
  isExternalListing: false,
  isFull: false,
  externalListingLink: null,
  externalHostName: null,
  notifyIFrameLink: null,
  profileId: null,
  categoryId: 2,
};

const checkoutMetadata: CheckoutMetadata = {
  userId: "123",
  registrantFirstName: "John",
  registrantLastName: "Doe",
  partySize: 4,
  email: "john.doe@example.com",
  phone: "123-456-7890",
  textNotifications: true,
  experienceId: 1,
  availabilityId: 1,
};

const stripeMock = createCheckoutSessionObject(
  testExperience,
  checkoutMetadata
);

const server = setupServer(
  rest.post("api/webhooks/stripe-webhook", (req, res, ctx) => {
    return res(ctx.json(stripeMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Stripe Webhook Metadata Test", async () => {
  const response: Response = await fetch(
    "http://localhost:3000/api/webhooks/stripe-webhook",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dummyData: "dummyValue" }), // Adjust as needed
    }
  );

  // Parse the response as JSON
  const responseData: unknown = await response.json();
  const expectedMetadata = {
    userId: "123",
    registrantFirstName: "John",
    registrantLastName: "Doe",
    partySize: 4,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    textNotifications: "true",
    experienceId: 1,
    availabilityId: 1,
  };

  expect((responseData as { metadata: object }).metadata).toEqual(
    expectedMetadata
  );
});
