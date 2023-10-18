import type { CheckoutMetadata, RegistrationInfo } from "../routers/types";

export const createFreeRegistrationInfo = (
  input: CheckoutMetadata
): RegistrationInfo => ({
  userId: input.userId,
  registrantFirstName: input.registrantFirstName,
  registrantLastName: input.registrantLastName,
  partySize: input.partySize,
  email: input.email,
  phone: input.phone,
  textNotificationsEnabled: input.textNotifications,
  experienceId: input.experienceId,
  availabilityId: input.availabilityId,
  stripeCheckoutSessionId: "free",
  status: null,
});
