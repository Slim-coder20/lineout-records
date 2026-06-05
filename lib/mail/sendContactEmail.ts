/**
 * =============================================================================
 * EMAIL CONTACT — lib/mail/sendContactEmail.ts
 * =============================================================================
 * QUOI   : Envoie un email de notification via l'API Resend.
 * POURQUOI : Alerter l'équipe LineOut quand quelqu'un remplit le formulaire.
 * VARIABLES : RESEND_API_KEY, MAIL_FROM, MAIL_TO (.env.local)
 * =============================================================================
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactEmailPayload = {
  name: string;
  email: string;
  requestType: string;
  message: string;
};

// Traduction des codes requestType en libellés lisibles dans l'email
const requestTypeLabels: Record<string, string> = {
  infos: "Demande d'informations",
  devis: "Demande de devis",
};

export async function sendContactEmail(data: ContactEmailPayload) {
  const mailTo = process.env.MAIL_TO ?? "lineout.records93@gmail.com";
  const mailFrom =
    process.env.MAIL_FROM ?? "LineOut Records <onboarding@resend.dev>";
  const requestLabel =
    requestTypeLabels[data.requestType] ?? data.requestType;

  const { error } = await resend.emails.send({
    from: mailFrom,
    to: mailTo,
    replyTo: data.email, // répondre directement au visiteur
    subject: `Contact LineOut — ${requestLabel}`,
    text: `Nom: ${data.name}\nEmail: ${data.email}\nType: ${requestLabel}\n\n${data.message}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
