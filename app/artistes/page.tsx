import ArtistImage from "@/components/ArtistImage";
import CtaButton from "@/components/CtaButton";
import SocialLinks from "@/components/SocialLinks";
import { getArtists } from "@/lib/data/artists";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Artistes — LineOut Records",
  description: "Découvrez les artistes du label et studio LineOut Records.",
};

export default async function ArtistesPage() {
  const artists = await getArtists();

  return (
    <div className="bg-white">
      <section className="bg-brand-cream">
        <div className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Roster
            </p>
            <h1 className="mt-2 text-4xl font-bold text-brand-dark">Nos artistes</h1>
            <p className="mt-4 text-lg text-brand-mid">
              Les talents accompagnés par LineOut Records — studio au service de leur musique.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-brand-dark">
                Suivez LineOut Records
              </p>
              <SocialLinks justify="center" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        {artists.length === 0 ? (
          <div className="rounded-xl border border-brand-mid/20 bg-brand-cream/50 px-6 py-16 text-center">
            <p className="text-lg font-medium text-brand-dark">
              Aucun artiste pour le moment.
            </p>
            <p className="mt-2 text-sm text-brand-mid">
              Revenez bientôt pour découvrir le roster LineOut Records.
            </p>
            <div className="mt-8">
              <CtaButton href="/contact">Nous contacter</CtaButton>
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="flex flex-col overflow-hidden rounded-xl border border-brand-mid/15 bg-white shadow-sm transition hover:border-brand-accent/40 hover:shadow-md"
              >
                <Link
                  href={`/artistes/${artist.slug}`}
                  className="group relative aspect-square overflow-hidden"
                >
                  <ArtistImage
                    src={artist.image}
                    alt={artist.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-dark/0 transition group-hover:bg-brand-dark/10" />
                </Link>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h2 className="text-xl font-semibold text-brand-dark">
                      <Link
                        href={`/artistes/${artist.slug}`}
                        className="transition hover:text-brand-mid"
                      >
                        {artist.name}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-brand-mid">
                      {artist.description}
                    </p>
                  </div>

                  <Link
                    href={`/artistes/${artist.slug}`}
                    className="mt-auto text-sm font-semibold text-brand-dark transition hover:text-brand-accent"
                  >
                    Voir le profil →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
