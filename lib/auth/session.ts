import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_SUBJECT = "admin";

async function getExpectedToken(): Promise<string | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const encoder = new TextEncoder();
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

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export async function isValidSessionToken(
  token: string | undefined
): Promise<boolean> {
  const expected = await getExpectedToken();
  if (!expected || !token) return false;

  return timingSafeEqualHex(token, expected);
}

export async function createSession(): Promise<void> {
  const token = await getExpectedToken();
  if (!token) throw new Error("SESSION_SECRET manquant");

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
