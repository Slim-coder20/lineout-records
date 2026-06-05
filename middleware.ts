/**
 * Garde d'accès pour l'espace admin (/admin/*).
 * S'exécute avant chaque requête admin : redirige vers le login si pas de session,
 * ou vers le dashboard si déjà connecté sur la page login.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin";
  const session = request.cookies.get("admin_session")?.value;
  const loggedIn = await isValidSessionToken(session);

  if (!loggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (loggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
