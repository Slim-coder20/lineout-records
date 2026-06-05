/**
 * =============================================================================
 * PAGE CONTACT — app/contact/page.tsx
 * =============================================================================
 * QUOI   : Formulaire de contact public (/contact).
 * FLUX   : <form action={submitContact}> → Server Action → MongoDB + email
 * NOTE   : RequestTypeSelect est un Client Component (interactif) imbriqué
 *          dans ce Server Component — pattern courant Next.js App Router.
 * =============================================================================
 */
import { submitContact } from "@/app/actions/contact";
import brandIcon from "@/app/icon.png";
import RequestTypeSelect from "@/components/RequestTypeSelect";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — LineOut Records",
  description:
    "Contactez LineOut Records pour une demande d'informations ou un devis studio.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-brand-cream">
        <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h1 className="mb-12 text-center text-2xl font-semibold text-brand-dark md:mb-14 md:text-3xl">
            Vous avez une question ? Nous sommes à votre écoute
          </h1>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* Colonne gauche : logo */}
            <div className="flex justify-center md:justify-start md:pr-6 lg:pr-12">
              <Image
                src={brandIcon}
                alt="LineOut Records"
                width={280}
                height={280}
                className="rounded-full ring-4 ring-brand-accent/50 shadow-lg"
                priority
              />
            </div>

            {/* Colonne droite : formulaire → submitContact (Server Action) */}
            <form action={submitContact} className="flex flex-col gap-6 md:pl-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom et Prénom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="form-field"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="form-field"
                />
              </div>

              <div>
                <label
                  htmlFor="requestType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type de demande
                </label>
                <RequestTypeSelect />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="form-field"
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-medium text-brand-dark transition hover:bg-brand-cream-deep focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
