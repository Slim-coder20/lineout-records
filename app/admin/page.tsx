import brandIcon from "@/app/icon.png";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration — LineOut Records",
  description: "Espace d'administration LineOut Records",
};

export default function AdminLoginPage() {
  return (
    <div className="bg-brand-cream">
      <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-16 md:py-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-brand-mid/20 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)] md:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <Image
                src={brandIcon}
                alt="LineOut Records"
                width={72}
                height={72}
                className="rounded-full ring-2 ring-brand-accent/60"
                priority
              />
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Espace sécurisé
              </p>
              <h1 className="mt-2 text-2xl font-bold text-brand-dark">
                Administration
              </h1>
              <p className="mt-2 text-sm text-brand-mid">
                Connectez-vous pour gérer les artistes et les productions.
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="admin@lineoutrecords.com"
                  className="form-field"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="form-field"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2"
              >
                Se connecter
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-brand-mid">
            Accès réservé à l&apos;équipe LineOut Records.
          </p>
        </div>
      </section>
    </div>
  );
}
