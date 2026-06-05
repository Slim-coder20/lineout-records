/**
 * Fiche artiste (/artistes/[slug]). Route dynamique selon le slug en base.
 * generateMetadata pour le SEO ; notFound() si l'artiste n'existe pas.
 */
import ArtistImage from "@/components/ArtistImage";
import CtaButton from "@/components/CtaButton";
import SocialLinks from "@/components/SocialLinks";
import { getArtistBySlug } from "@/lib/data/artists";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type ArtistDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArtistDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    return { title: "Artiste introuvable — LineOut Records" };
  }

  return {
    title: `${artist.name} — LineOut Records`,
    description: artist.description,
  };
}

export default async function ArtistDetailsPage({
  params,
}: ArtistDetailsPageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="bg-brand-cream">
        <div className="container mx-auto max-w-6xl px-6 py-10 md:py-14">
          <Link
            href="/artistes"
            className="text-sm font-medium text-brand-mid transition hover:text-brand-dark"
          >
            ← Retour aux artistes
          </Link>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)] lg:mx-0">
            <ArtistImage
              src={artist.image}
              alt={artist.name}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Artiste LineOut
              </p>
              <h1 className="mt-2 text-4xl font-bold text-brand-dark">
                {artist.name}
              </h1>
            </div>

            <p className="whitespace-pre-line text-base leading-relaxed text-brand-mid">
              {artist.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <CtaButton href="/release" variant="outline">
                Ses productions
              </CtaButton>
              <CtaButton href="/contact">Travailler avec le studio</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-mid/15 bg-brand-cream/50 py-10">
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm font-medium text-brand-dark">
            Suivez LineOut Records
          </p>
          <div className="mt-4">
            <SocialLinks justify="center" />
          </div>
        </div>
      </section>
    </div>
  );
}
