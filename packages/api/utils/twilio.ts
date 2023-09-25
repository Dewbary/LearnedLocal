import { Twilio } from "twilio";
import { env } from "~/env.mjs";


export default async function sendTextMessage(phoneNumber?: string | null, message?: string | null) {
    if (!phoneNumber || !message) {
        console.log("No phone number or message provided to sendTextMessage");
        return;
    }

    const twilioClient = new Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

    await twilioClient.messages.create({
      body: message,
      from: env.TWILIO_ACCOUNT_PHONE,
      to: `+1${phoneNumber}`
    });
}