/**
 * Page de confirmation (/contact/success) après envoi réussi du formulaire contact.
 */
import Link from "next/link";

export default function ContactSuccessPage() {
  return (
    <main className="container mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-brand-dark">
        Message envoyé
      </h1>
      <p className="mt-4 text-brand-mid">
        Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium text-brand-dark transition hover:bg-brand-cream-deep"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
