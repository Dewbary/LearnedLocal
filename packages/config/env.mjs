import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  SENDGRID_API_KEY: z.string().min(1),
  SANITY_STUDIO_PROJECT_ID: z.string().min(1),
  SANITY_STUDIO_DATASET: z.string().min(1),
  SANITY_STUDIO_API_VERSION: z.string().min(1),
  TWILIO_ACCOUNT_SID: z.string().min(1),
  TWILIO_AUTH_TOKEN: z.string().min(1),
  TWILIO_ACCOUNT_PHONE: z.string().min(1),
  EDGE_FUNCTION_VERIFICATION_TOKEN: z.string().min(1),
  ADMIN_USER_ID: z.string().min(1),
  GOOGLE_ANALYTICS_PROPERTY_ID: z.string().min(1),
  GOOGLE_PRIVATE_KEY: z.string().min(1),
  GOOGLE_CLIENT_EMAIL: z.string().min(1),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
  NEXT_PUBLIC_GA4_DEBUG_TRUE: z.string().min(1),
  NEXT_PUBLIC_FACEBOOK_APP_ID: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME,
  NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_URL:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_URL,
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
  SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_PHONE: process.env.TWILIO_ACCOUNT_PHONE,
  EDGE_FUNCTION_VERIFICATION_TOKEN:
    process.env.EDGE_FUNCTION_VERIFICATION_TOKEN,
  NEXT_PUBLIC_GA4_DEBUG_TRUE: process.env.NEXT_PUBLIC_GA4_DEBUG_TRUE,
  ADMIN_USER_ID: process.env.ADMIN_USER_ID,
  NEXT_PUBLIC_FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  GOOGLE_ANALYTICS_PROPERTY_ID: process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  /* eslint-disable */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
  /* eslint-enable */
}

export { env };
