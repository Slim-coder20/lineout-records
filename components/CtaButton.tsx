/**
 * =============================================================================
 * BOUTON CTA — components/CtaButton.tsx
 * =============================================================================
 * QUOI   : Lien stylé comme un bouton (Call To Action).
 * POURQUOI : Réutilisable sur toutes les pages avec 3 variantes visuelles.
 * =============================================================================
 */
import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
};

export default function CtaButton({
  href,
  children,
  variant = "primary",
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2";

  const variants = {
    primary: `${base} bg-brand-accent text-brand-dark hover:bg-brand-cream-deep`,
    secondary: `${base} bg-brand-dark text-brand-cream hover:bg-brand-mid`,
    outline: `${base} border-2 border-brand-dark/20 text-brand-dark hover:border-brand-accent hover:bg-brand-cream-warm`,
  };

  return (
    <Link href={href} className={variants[variant]}>
      {children}
    </Link>
  );
}
