/**
 * =============================================================================
 * NAVBAR ADMIN — components/NavbarAdmin.tsx
 * =============================================================================
 * QUOI   : Barre de navigation fixe pour l'espace d'administration.
 * POURQUOI : Client Component (menu burger mobile + déconnexion accessible).
 * =============================================================================
 */
"use client";

import { logoutAdmin } from "@/app/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import brandIcon from "@/app/icon.png";

const navLinks = [
  { href: "/admin/dashboard", label: "Tableau de bord" },
  { href: "/admin/artistes", label: "Artistes" },
  { href: "/admin/productions", label: "Productions" },
] as const;

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="size-6 text-gray-700"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function LogoutButton({ mobile }: { mobile: boolean }) {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className={
          mobile
            ? "block w-full rounded-lg px-3 py-3 text-left text-base font-medium text-red-700 transition-colors hover:bg-red-50"
            : "rounded-lg border border-brand-mid/30 px-4 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep"
        }
        onClick={() => {
          if (mobile) {
            document.body.style.overflow = "";
          }
        }}
      >
        Se déconnecter
      </button>
    </form>
  );
}

export default function NavbarAdmin() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)
      ? "text-sm font-semibold leading-none text-brand-dark"
      : "text-sm leading-none text-gray-700 transition-colors hover:text-gray-900";

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <nav
      aria-label="Navigation administration"
      className="fixed top-0 right-0 left-0 z-50 bg-brand-cream text-brand-dark shadow-[0_4px_24px_-8px_rgba(64,80,80,0.12)]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link
          href="/admin/dashboard"
          className="group inline-flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={brandIcon}
            alt="LineOut Records"
            width={40}
            height={40}
            className="shrink-0 rounded-full ring-2 ring-brand-accent/60 transition group-hover:ring-brand-accent"
            priority
          />
          <span className="hidden font-semibold leading-none tracking-wide text-gray-700 transition-colors group-hover:text-gray-900 sm:inline">
            ADMIN
          </span>
        </Link>

        <div className="hidden items-center gap-x-6 md:flex">
          <ul className="flex items-center gap-x-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <LogoutButton mobile={false} />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-brand-dark/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="admin-mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>

      <div
        id="admin-mobile-menu"
        className={`overflow-hidden border-t border-brand-dark/10 bg-brand-cream transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded-lg px-3 py-3 text-base transition-colors hover:bg-brand-dark/10 hover:text-gray-900 ${
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? "bg-brand-dark/10 font-semibold text-brand-dark"
                    : "text-gray-700"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-brand-dark/10 pt-3">
            <LogoutButton mobile={true} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
