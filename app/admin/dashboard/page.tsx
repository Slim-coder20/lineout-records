/**
 * Tableau de bord admin (/admin/dashboard). Protégé par middleware.ts.
 * Point d'entrée futur du CRUD artistes/productions ; déconnexion via logoutAdmin.
 */
import { logoutAdmin } from "@/app/actions/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord — LineOut Records",
  description: "Espace d'administration LineOut Records",
};

export default function AdminDashboardPage() {
  return (
    <div className="bg-brand-cream">
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="rounded-2xl border border-brand-mid/20 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Administration
          </p>
          <h1 className="mt-2 text-2xl font-bold text-brand-dark">
            Tableau de bord
          </h1>
          <p className="mt-3 text-sm text-brand-mid">
            Vous êtes connecté. Les outils de gestion (artistes, productions)
            arriveront ici.
          </p>

          <form action={logoutAdmin} className="mt-8">
            <button
              type="submit"
              className="rounded-lg border border-brand-mid/30 px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
