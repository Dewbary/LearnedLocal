import Stripe from "stripe";

export type CheckoutMetadata = {
  userId: string;
  experienceId: number;
  availabilityId: number;
  registrantFirstName: string;
  registrantLastName: string;
  partySize: number;
  email: string;
  phone: string;
  textNotifications: boolean;
};

export type RegistrationInfo = {
  userId: string;
  registrantFirstName: string;
  registrantLastName: string;
  partySize: number;
  email: string;
  phone: string;
  textNotificationsEnabled: boolean;
  experienceId: number;
  availabilityId: number;
  stripeCheckoutSessionId: string;
  status: Stripe.Checkout.Session.Status | null;
};
