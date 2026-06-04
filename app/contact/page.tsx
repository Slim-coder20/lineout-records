import { submitContact } from "@/app/actions/contact";
import brandIcon from "@/app/icon.png";
import RequestTypeSelect from "@/components/RequestTypeSelect";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-center text-2xl font-semibold text-brand-dark md:mb-12">
        Vous avez une question ? Nous sommes à votre écoute
      </h1>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex justify-center md:justify-end">
          <Image
            src={brandIcon}
            alt="LineOut Records"
            width={280}
            height={280}
            className="rounded-full ring-4 ring-brand-accent/50"
            priority
          />
        </div>

        <form action={submitContact} className="flex flex-col gap-6">
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
    </main>
  );
}
