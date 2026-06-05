/**
 * =============================================================================
 * MIDDLEWARE — middleware.ts
 * =============================================================================
 * QUOI   : Garde d'accès pour /admin/* — s'exécute AVANT chaque requête.
 * POURQUOI : Centralise la protection : pas besoin de vérifier l'auth dans
 *            chaque page admin individuellement.
 * =============================================================================
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne traite que les routes /admin (les autres passent sans contrôle)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin";
  const session = request.cookies.get("admin_session")?.value;
  const loggedIn = await isValidSessionToken(session);

  // Non connecté + page protégée → renvoyer au login
  if (!loggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Connecté + page login → éviter de re-afficher le formulaire
  if (loggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Sinon : laisser passer la requête normalement
  return NextResponse.next();
}

// Limite l'exécution du middleware aux routes /admin uniquement
export const config = {
  matcher: ["/admin/:path*"],
};
