/**
 * =============================================================================
 * SESSION ADMIN — lib/auth/session.ts
 * =============================================================================
 * QUOI   : Gère le cookie de session après connexion admin.
 * POURQUOI : On ne stocke JAMAIS le mot de passe dans le cookie. On stocke
 *            un jeton signé (HMAC) dérivé de SESSION_SECRET.
 * UTILISÉ PAR : app/actions/auth.ts (login/logout), middleware.ts (protection)
 * =============================================================================
 */
import { cookies } from "next/headers";

// Nom du cookie lu/écrit dans le navigateur
const COOKIE_NAME = "admin_session";
// Chaîne signée — identifie qu'il s'agit d'une session admin
const SESSION_SUBJECT = "admin";

/**
 * Génère le jeton attendu : HMAC-SHA256(SESSION_SECRET, "admin").
 * Même algorithme côté création (login) et vérification (middleware).
 */
async function getExpectedToken(): Promise<string | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const encoder = new TextEncoder();
  // Importe la clé secrète pour l'API Web Crypto (compatible Edge + Node)
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(SESSION_SUBJECT)
  );

  return Buffer.from(signature).toString("hex");
}

/**
 * Compare deux chaînes en temps constant (évite les attaques par timing).
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/** Vérifie si le token du cookie correspond au jeton attendu. */
export async function isValidSessionToken(
  token: string | undefined
): Promise<boolean> {
  const expected = await getExpectedToken();
  if (!expected || !token) return false;

  return timingSafeEqualHex(token, expected);
}

/** Pose le cookie admin_session après un login réussi. */
export async function createSession(): Promise<void> {
  const token = await getExpectedToken();
  if (!token) throw new Error("SESSION_SECRET manquant");

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true, // JavaScript du navigateur ne peut pas lire ce cookie (sécurité XSS)
    secure: process.env.NODE_ENV === "production", // HTTPS uniquement en prod
    sameSite: "lax", // protection CSRF basique
    maxAge: 60 * 60 * 24 * 7, // 7 jours en secondes
    path: "/",
  });
}

/** Retourne true si l'utilisateur a une session valide (pages serveur). */
export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

/** Supprime le cookie à la déconnexion. */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
