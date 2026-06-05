/**
 * Pied de page : logo, navigation, liens sociaux (SocialLinks), copyright.
 */
import Image from "next/image";
import Link from "next/link";
import brandIcon from "@/app/icon.png";
import SocialLinks from "@/components/SocialLinks";

const navLinks = [
  { href: "/about", label: "A propos" },
  { href: "/artistes", label: "Artistes" },
  { href: "/release", label: "Productions" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-brand-cream text-brand-dark shadow-[0_-6px_24px_-8px_rgba(64,80,80,0.12)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-3 md:gap-6">
        <div className="flex justify-center md:justify-start">
          <Link href="/" className="group inline-flex items-center gap-3">
            <Image
              src={brandIcon}
              alt="LineOut Records"
              width={60}
              height={60}
              className="shrink-0 rounded-full ring-2 ring-brand-accent/60 transition group-hover:ring-brand-accent"
            />
            <span className="text-lg font-semibold leading-none tracking-wide text-gray-700 transition-colors group-hover:text-gray-900">
              LINE OUT RECORDS
            </span>
          </Link>
        </div>

        <nav
          aria-label="Navigation pied de page"
          className="flex justify-center"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <li key={href} className="flex items-center">
                <Link
                  href={href}
                  className="text-sm leading-none text-gray-700 transition-colors hover:text-gray-900"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center md:justify-end">
          <SocialLinks justify="end" />
        </div>
      </div>

      <div className="px-6 py-4 text-center text-xs text-brand-dark/60">
        <p>
          © {new Date().getFullYear()} LineOut Records — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
