/**
 * =============================================================================
 * AUTH ADMIN — app/actions/auth.ts
 * =============================================================================
 * QUOI   : Server Actions pour login et logout admin.
 * POURQUOI : "use server" = code exécuté uniquement sur le serveur, jamais
 *            exposé au navigateur (mot de passe, hash, SESSION_SECRET).
 * FLUX LOGIN : email → bcrypt → cookie → redirect dashboard
 * =============================================================================
 */
"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth/session";

/** Extrait une string propre depuis FormData (trim + garde-fou type). */
function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Traite la soumission du formulaire /admin.
 * Branché via <form action={loginAdmin}> dans app/admin/page.tsx
 */
export async function loginAdmin(formData: FormData) {
  // 1. Lire les champs du formulaire
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  // 2. Lire les identifiants depuis .env.local (jamais en dur dans le code)
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  // 3. Vérifier que tout est présent
  if (!email || !password || !adminEmail || !passwordHash) {
    redirect("/admin?error=missing-fields");
  }

  // 4. Comparer l'email (comparaison exacte, insensible à la casse)
  if (email !== adminEmail) {
    redirect("/admin?error=invalid-credentials");
  }

  // 5. Comparer le mot de passe saisi avec le hash bcrypt stocké en .env
  const isValid = await bcrypt.compare(password, passwordHash);
  if (!isValid) {
    redirect("/admin?error=invalid-credentials");
  }

  // 6. Créer le cookie de session
  try {
    await createSession();
  } catch {
    redirect("/admin?error=server");
  }

  // 7. Rediriger vers le dashboard (connexion réussie)
  redirect("/admin/dashboard");
}

/** Supprime la session et renvoie à la page login. */
export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin");
}
