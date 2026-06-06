/**
 * =============================================================================
 * NAVBAR — components/Navbar.tsx
 * =============================================================================
 * QUOI   : Barre de navigation fixe en haut du site.
 * POURQUOI : "use client" car le menu burger mobile nécessite useState/useEffect.
 *            Les Server Components ne peuvent pas gérer l'état interactif.
 * =============================================================================
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import brandIcon from "@/app/icon.png";

const navLinks = [
  { href: "/about", label: "A propos" },
  { href: "/artistes", label: "Artistes" },
  { href: "/release", label: "Productions" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
] as const;

/** Icône burger (3 traits) ou croix selon l'état open. */
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

export default function Navbar() {
  // État local : menu mobile ouvert ou fermé
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Ferme le menu avec la touche Échap (accessibilité)
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed top-0 right-0 left-0 z-50 bg-brand-cream text-brand-dark shadow-[0_4px_24px_-8px_rgba(64,80,80,0.12)]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        {/* Logo + nom — retour accueil */}
        <Link
          href="/"
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
          <span className="hidden text-gray-700 font-semibold leading-none tracking-wide  transition-colors group-hover:text-gray-900 sm:inline">
            LINE OUT RECORDS
          </span>
        </Link>

        {/* Navigation desktop (cachée sur mobile) */}
        <ul className="hidden items-center gap-x-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm leading-none text-gray-700 transition-colors hover:text-gray-900"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bouton burger — visible uniquement sur mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-brand-dark/10 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Panneau menu mobile (animation max-height) */}
      <div
        id="mobile-menu"
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
                className="block rounded-lg px-3 py-3 text-base text-gray-700 transition-colors hover:bg-brand-dark/10 hover:text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
