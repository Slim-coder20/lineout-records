"use server";

import { redirect } from "next/navigation";
import { sendContactEmail } from "@/lib/mail/sendContactEmail";
import { connectToDB } from "@/lib/utils/connectToDB";
import { Contact } from "@/lib/models/contact";


// introduire les types de requêtes // 
const REQUEST_TYPES = ["infos", "devis"] as const;
type RequestType = (typeof REQUEST_TYPES)[number];

// Introduire le regex pour l'email // 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fonction pour obtenir une chaîne de caractères //
function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

// Fonction pour soumettre le formulaire de contact //
export async function submitContact(formData: FormData) {
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email")).toLowerCase();
  const requestType = getString(formData.get("requestType"));
  const message = getString(formData.get("message"));
  // Vérifier si les champs sont remplis //
  if (!name || !email || !requestType || !message) {
    redirect("/contact?error=missing-fields");
  }

  // Vérifier si l'email est valide //
  if (!EMAIL_REGEX.test(email)) {
    redirect("/contact?error=invalid-email");
  }

  // Vérifier si le type de requête est valide //
  if (!REQUEST_TYPES.includes(requestType as RequestType)) {
    redirect("/contact?error=invalid-request-type");
  }

  // Connexion à la base de données //
  try {
    await connectToDB();
    // Création du contact //
    await Contact.create({
      name,
      email,
      requestType: requestType as RequestType,
      message,
    });
    await sendContactEmail({ name, email, requestType, message });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    redirect("/contact?error=server");
  }

  redirect("/contact/success");
}
