/**
 * =============================================================================
 * CONTACT — app/actions/contact.ts
 * =============================================================================
 * QUOI   : Server Action du formulaire /contact.
 * FLUX   : validation → MongoDB (Contact) → email Resend → redirect success
 * =============================================================================
 */
"use server";

import { redirect } from "next/navigation";
import { sendContactEmail } from "@/lib/mail/sendContactEmail";
import { connectToDB } from "@/lib/utils/connectToDB";
import { Contact } from "@/lib/models/contact";

// Types de demande autorisés (doit correspondre au modèle Contact et au select)
const REQUEST_TYPES = ["infos", "devis"] as const;
type RequestType = (typeof REQUEST_TYPES)[number];

// Regex simple pour valider le format email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Nettoie une valeur FormData en string trimée. */
function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Point d'entrée : appelé par <form action={submitContact}> */
export async function submitContact(formData: FormData) {
  // --- Étape 1 : lire les champs ---
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email")).toLowerCase();
  const requestType = getString(formData.get("requestType"));
  const message = getString(formData.get("message"));

  // --- Étape 2 : validation ---
  if (!name || !email || !requestType || !message) {
    redirect("/contact?error=missing-fields");
  }

  if (!EMAIL_REGEX.test(email)) {
    redirect("/contact?error=invalid-email");
  }

  if (!REQUEST_TYPES.includes(requestType as RequestType)) {
    redirect("/contact?error=invalid-request-type");
  }

  // --- Étape 3 : persistance + notification ---
  try {
    await connectToDB();

    // Sauvegarde en base pour historique / admin futur
    await Contact.create({
      name,
      email,
      requestType: requestType as RequestType,
      message,
    });

    // Envoie l'email à l'équipe LineOut via Resend
    await sendContactEmail({ name, email, requestType, message });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    redirect("/contact?error=server");
  }

  // --- Étape 4 : confirmation utilisateur ---
  redirect("/contact/success");
}
