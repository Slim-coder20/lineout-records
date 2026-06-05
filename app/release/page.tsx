/**
 * =============================================================================
 * PAGE PRODUCTIONS — app/release/page.tsx
 * =============================================================================
 * QUOI   : Liste publique des releases du label (/release).
 * POURQUOI : Server Component async — charge les données MongoDB au rendu.
 * FLUX   : getProductions() → grille de cartes ou message « aucune production ».
 * =============================================================================
 */
import ArtistImage from "@/components/ArtistImage";
import CtaButton from "@/components/CtaButton";
import { productionTypeLabels } from "@/lib/config/productionTypes";
import { getProductions } from "@/lib/data/productions";
import Link from "next/link";
import type { Metadata } from "next";

// Désactive le cache statique : la page est regénérée à chaque visite (données fraîches)
export const dynamic = "force-dynamic";

// Métadonnées SEO (titre et description dans l'onglet du navigateur + Google)
export const metadata: Metadata = {
  title: "Productions — LineOut Records",
  description:
    "Découvrez les singles, EP et albums produits par LineOut Records.",
};

// Extrait l'année depuis une date ISO (ex: "2026-01-15..." → "2026")
function formatReleaseYear(isoDate: string): string {
  return new Date(isoDate).getFullYear().toString();
}

export default async function ReleasePage() {
  // Appel serveur : récupère les productions depuis MongoDB avant d'afficher la page
  const productions = await getProductions();

  return (
    <div className="bg-white">
      {/* --- En-tête de page (hero) --- */}
      <section className="bg-brand-cream">
        <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Discographie
            </p>
            <h1 className="mt-2 text-4xl font-bold text-brand-dark">
              Nos productions
            </h1>
            <p className="mt-4 text-lg text-brand-mid">
              Singles, EP et albums réalisés au studio et sortis sous le label
              LineOut Records.
            </p>
          </div>
        </div>
      </section>

      {/* --- Grille de productions ou état vide --- */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        {productions.length === 0 ? (
          // Cas : aucune production en base (normal avant le CRUD admin)
          <div className="rounded-xl border border-brand-mid/20 bg-brand-cream/50 px-6 py-16 text-center">
            <p className="text-lg font-medium text-brand-dark">
              Aucune production pour le moment.
            </p>
            <p className="mt-2 text-sm text-brand-mid">
              Revenez bientôt pour découvrir les prochaines sorties du label.
            </p>
            <div className="mt-8">
              <CtaButton href="/contact">Nous contacter</CtaButton>
            </div>
          </div>
        ) : (
          // Cas : au moins une production — grille responsive 1 / 2 / 3 colonnes
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productions.map((production) => (
              <li
                key={production.id}
                className="flex flex-col overflow-hidden rounded-xl border border-brand-mid/15 bg-white shadow-sm transition hover:border-brand-accent/40 hover:shadow-md"
              >
                {/* Pochette carrée (aspect-square) */}
                <div className="relative aspect-square overflow-hidden">
                  <ArtistImage
                    src={production.image}
                    alt={`Pochette — ${production.title}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Infos texte sous la pochette */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Badge type : Single, EP, Album… */}
                    <span className="rounded-full bg-brand-accent/30 px-3 py-1 text-xs font-medium text-brand-dark">
                      {productionTypeLabels[production.type]}
                    </span>
                    {/* Genre optionnel */}
                    {production.genre ? (
                      <span className="text-xs text-brand-muted">
                        {production.genre}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-brand-dark">
                      {production.title}
                    </h2>
                    <p className="mt-1 text-sm text-brand-mid">
                      {/* Lien vers la fiche de l'artiste */}
                      <Link
                        href={`/artistes/${production.artist.slug}`}
                        className="font-medium text-brand-dark transition hover:text-brand-accent"
                      >
                        {production.artist.name}
                      </Link>
                      <span className="mx-1.5 text-brand-muted">·</span>
                      {/* Année de sortie */}
                      <span>{formatReleaseYear(production.releaseDate)}</span>
                    </p>
                    {/* line-clamp-3 : limite à 3 lignes avec « … » */}
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-mid">
                      {production.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
