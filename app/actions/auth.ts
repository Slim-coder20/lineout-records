/**
 * Server Actions d'authentification admin.
 * loginAdmin : vérifie email + bcrypt, pose le cookie, redirige.
 * logoutAdmin : supprime le cookie et renvoie au login.
 */
"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth/session";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdmin(formData: FormData) {
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!email || !password || !adminEmail || !passwordHash) {
    redirect("/admin?error=missing-fields");
  }

  if (email !== adminEmail) {
    redirect("/admin?error=invalid-credentials");
  }

  const isValid = await bcrypt.compare(password, passwordHash);
  if (!isValid) {
    redirect("/admin?error=invalid-credentials");
  }

  try {
    await createSession();
  } catch {
    redirect("/admin?error=server");
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin");
}
