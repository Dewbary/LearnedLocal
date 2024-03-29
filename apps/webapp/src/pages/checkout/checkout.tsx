import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Head from "next/head";

type FormData = {
  firstName: string;
  lastName: string;
  partySize: string;
  email: string;
  phone: string;
  textNotifications: boolean;
};

const Checkout = () => {
  const router = useRouter();
  const { experienceId, availabilityId } = router.query;
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    partySize: router.query.partySize as string,
    email: "",
    phone: "",
    textNotifications: true,
  });

  const createCheckoutSession = api.payment.createCheckoutSession.useMutation();
  const { data: experienceInfo } = api.experience.byExperienceId.useQuery(parseInt(experienceId as string || "0"));
  const { user } = useUser();

  const getStripe = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ""
    );
    return stripe;
  };

  function handleCheckout() {
    if (!user?.id || !experienceId) return;

    createCheckoutSession.mutate(
      {
        experienceId: parseInt(experienceId as string),
        availabilityId: parseInt(availabilityId as string),
        userId: user.id,
        registrantFirstName: formData.firstName,
        registrantLastName: formData.lastName,
        partySize: parseInt(formData.partySize),
        email: formData.email,
        phone: formData.phone,
        textNotifications: formData.textNotifications,
      },
      {
        onSuccess: async (data) => {
          const sessionId = data?.sessionId;

          if (sessionId) {
            const stripe = await getStripe();
            if (stripe) {
              await stripe.redirectToCheckout({ sessionId });
            } else {
              console.error("Stripe failed to initialize");
            }
          } else {
            await router.push("/");
          }
        },
        onError: (error) => {
          if (error.message === "TOO_MANY_IN_PARTY") {
            window.alert(
              "You have too many people in your party for this experience to accomodate."
            );
          } else {
            console.error("Error creating checkout session:", error);
          }
        },
      }
    );
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextReminderChange = () => {
    setFormData({
      ...formData,
      textNotifications: !formData.textNotifications,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call your API or perform any action with the formData
    handleCheckout();
  };

  return (
    <>
      <Head>
        <title>Learned Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-row items-center">
            <Link className="pr-8" href="/home">
              <div className="mb-6 block text-sm text-blue-500">
                &larr; Go Back
              </div>
            </Link>
            <h1 className="mb-6 text-2xl font-bold text-gray-700">
              Experience Checkout
            </h1>
          </div>
          <p className="mb-3">
            You&apos;re signing up for: <span className="font-bold">{experienceInfo?.title}</span>
          </p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                data-cy="checkout-first-name"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                data-cy="checkout-last-name"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Party Size
              </label>
              <input
                type="number"
                name="partySize"
                placeholder="Party Size"
                value={formData.partySize}
                onChange={handleChange}
                min="1"
                required
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                data-cy="checkout-party-size"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                data-cy="checkout-email"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Phone #
              </label>
              <input
                type="text"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                required
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                data-cy="checkout-phone"
              />
            </div>
            <div className="mb-6 flex flex-row items-center gap-3">
              <label className="text-sm font-bold text-gray-700">
                Receive text reminders for this experience
              </label>
              <input
                type="checkbox"
                name="textNotifications"
                checked={formData.textNotifications}
                onChange={handleTextReminderChange}
                className="h-4 w-4"
                data-cy="checkout-text-reminder"
              />
            </div>
            <button type="submit" className="btn btn-primary" data-cy="checkout-sign-up">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Checkout;
