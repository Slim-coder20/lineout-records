/**
 * =============================================================================
 * DASHBOARD ADMIN — app/admin/(protected)/dashboard/page.tsx
 * =============================================================================
 */
import { getArtists } from "@/lib/data/artists";
import { getProductions } from "@/lib/data/productions";
import { productionTypeLabels } from "@/lib/config/productionTypes";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord — LineOut Records",
  description: "Espace d'administration LineOut Records",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [artists, productions] = await Promise.all([
    getArtists(),
    getProductions(),
  ]);

  return (
    <div className="bg-brand-cream">
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Administration
          </p>
          <h1 className="mt-2 text-2xl font-bold text-brand-dark">
            Tableau de bord
          </h1>
          <p className="mt-3 text-sm text-brand-mid">
            Vue d&apos;ensemble du roster et des releases publiées sur le site.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)]">
            <p className="text-3xl font-bold text-brand-dark">{artists.length}</p>
            <p className="mt-1 text-sm text-brand-mid">Artiste{artists.length > 1 ? "s" : ""}</p>
            <Link
              href="/admin/artistes"
              className="mt-4 inline-block text-sm font-semibold text-brand-dark transition hover:text-brand-accent"
            >
              Gérer les artistes →
            </Link>
          </div>
          <div className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)]">
            <p className="text-3xl font-bold text-brand-dark">{productions.length}</p>
            <p className="mt-1 text-sm text-brand-mid">
              Production{productions.length > 1 ? "s" : ""}
            </p>
            <Link
              href="/admin/productions"
              className="mt-4 inline-block text-sm font-semibold text-brand-dark transition hover:text-brand-accent"
            >
              Gérer les productions →
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)] md:p-8">
            <h2 className="text-lg font-semibold text-brand-dark">Artistes</h2>
            {artists.length === 0 ? (
              <p className="mt-4 text-sm text-brand-mid">Aucun artiste pour le moment.</p>
            ) : (
              <ul className="mt-4 divide-y divide-brand-mid/15">
                {artists.map((artist) => (
                  <li
                    key={artist.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-brand-dark">{artist.name}</p>
                      <p className="text-xs text-brand-mid">/artistes/{artist.slug}</p>
                    </div>
                    <Link
                      href={`/artistes/${artist.slug}`}
                      className="text-sm font-medium text-brand-mid transition hover:text-brand-dark"
                    >
                      Voir sur le site
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)] md:p-8">
            <h2 className="text-lg font-semibold text-brand-dark">Releases</h2>
            {productions.length === 0 ? (
              <p className="mt-4 text-sm text-brand-mid">Aucune production pour le moment.</p>
            ) : (
              <ul className="mt-4 divide-y divide-brand-mid/15">
                {productions.map((production) => (
                  <li
                    key={production.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-brand-dark">{production.title}</p>
                      <p className="text-xs text-brand-mid">
                        {production.artistName} · {productionTypeLabels[production.type]} ·{" "}
                        {production.releaseDate.slice(0, 4)}
                      </p>
                    </div>
                    <Link
                      href="/release"
                      className="text-sm font-medium text-brand-mid transition hover:text-brand-dark"
                    >
                      Voir sur le site
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
