import { Experience } from '@prisma/client';
import sgMail from '@sendgrid/mail'
import { env } from '~/env.mjs'

type Props = {
    recipientEmail: string,
    experience: Experience
}

sgMail.setApiKey(env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({recipientEmail, experience}: Props) => {
    const msg = {
        to: recipientEmail,
        from: 'learnedlocal.app@gmail.com',
        templateId: 'd-0987664dd3394d89a28b7c758a847b50',
        dynamicTemplateData: {
            hostFirstName: experience.firstName,
            hostLastName: experience.lastName,
            experienceTitle: experience.title,
            hostEmail: '[email_placeholder]'
        }
    }

    try {
        await sgMail.send(msg);
    }
    catch (error) {
        console.error(error);
    }
}

export { sendConfirmationEmail };