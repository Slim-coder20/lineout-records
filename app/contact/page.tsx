"use client";

import brandIcon from "@/app/icon.png";
import RequestTypeSelect from "@/components/RequestTypeSelect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type SubmitEvent } from "react";

export default function ContactPage() {
  const router = useRouter();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const requestType = formData.get("requestType") as string;
    const message = formData.get("message") as string;
    console.log(name, email, requestType, message);

    // Vider le formulaire après soumission //
    e.currentTarget.reset();
    router.push("/contact/success");
  };

  return (
    <main className="container mx-auto max-w-6xl px-6 py-10">
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

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
