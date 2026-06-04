import brandIcon from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const services = [
  {
    title: "Enregistrement",
    description:
      "Capture vocale et instruments dans un cadre professionnel, avec un son clair et chaleureux.",
  },
  {
    title: "Mixage & mastering",
    description:
      "Équilibre, profondeur et finition prêtes pour les plateformes et la diffusion.",
  },
  {
    title: "Production musicale",
    description:
      "De l'idée à la maquette : arrangements, direction artistique et suivi de projet.",
  },
  {
    title: "Accompagnement",
    description:
      "Un label-studio qui accompagne les artistes à chaque étape de leur parcours.",
  },
] as const;

const studioGallery = [
  { src: "/studios/studio_2.png", alt: "Espace d'enregistrement LineOut Records" },
  { src: "/studios/studio_3.png", alt: "Console et monitoring du studio" },
  { src: "/studios/studio_5.png", alt: "Ambiance du studio LineOut Records" },
] as const;

const latestProductions = [
  {
    title: "Sessions live",
    artist: "Résidence artistes",
    year: "2025",
    tag: "En cours",
  },
  {
    title: "EP — sortie prochaine",
    artist: "Roster LineOut",
    year: "2025",
    tag: "À paraître",
  },
  {
    title: "Collab studio",
    artist: "Projets invités",
    year: "2024",
    tag: "Production",
  },
] as const;

function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2";

  const variants = {
    primary: `${base} bg-brand-accent text-brand-dark hover:bg-brand-cream-deep`,
    secondary: `${base} bg-brand-dark text-brand-cream hover:bg-brand-mid`,
    outline: `${base} border-2 border-brand-dark/20 text-brand-dark hover:border-brand-accent hover:bg-brand-cream-warm`,
  };

  return (
    <Link href={href} className={variants[variant]}>
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-cream">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Studio · Label · Production
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-dark md:text-5xl">
              LineOut Records
            </h1>
            <p className="max-w-lg text-lg text-brand-mid">
              Venez concrétiser vos idées musicales. Un studio pensé pour
              l&apos;écoute, la création et la sortie de vos projets.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaButton href="/artistes">Nos artistes</CtaButton>
              <CtaButton href="/release" variant="outline">
                Dernières productions
              </CtaButton>
              <CtaButton href="/contact" variant="secondary">
                Prendre contact
              </CtaButton>
            </div>
          </div>

          <div className="relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(64,80,80,0.35)]">
            <Image
              src="/studios/studio_1.png"
              alt="Studio LineOut Records"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold text-brand-dark">
            Ce que propose le studio
          </h2>
          <p className="mt-3 text-brand-mid">
            Un accompagnement complet, du premier enregistrement à la diffusion
            de votre musique.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li
              key={service.title}
              className="rounded-xl border border-brand-mid/15 bg-brand-cream/50 p-6 transition hover:border-brand-accent/40 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-brand-dark">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-mid">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Galerie studio */}
      <section className="bg-brand-cream-warm/40 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark">Le studio</h2>
              <p className="mt-2 max-w-xl text-brand-mid">
                Des espaces dédiés à la création, équipés pour un workflow
                professionnel et confortable.
              </p>
            </div>
            <Image
              src={brandIcon}
              alt=""
              width={56}
              height={56}
              className="hidden rounded-full ring-2 ring-brand-accent/50 md:block"
              aria-hidden
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {studioGallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-4/3 overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dernières productions */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark">
              Dernières productions
            </h2>
            <p className="mt-2 text-brand-mid">
              Projets récents et sorties à venir du label.
            </p>
          </div>
          <CtaButton href="/release" variant="outline">
            Toutes les productions
          </CtaButton>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestProductions.map((production) => (
            <li
              key={production.title}
              className="flex flex-col rounded-xl border border-brand-mid/15 bg-white p-6 shadow-sm transition hover:border-brand-accent/50"
            >
              <span className="w-fit rounded-full bg-brand-accent/30 px-3 py-1 text-xs font-medium text-brand-dark">
                {production.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                {production.title}
              </h3>
              <p className="mt-1 text-sm text-brand-mid">{production.artist}</p>
              <p className="mt-auto pt-4 text-xs text-brand-muted">
                {production.year}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA artistes */}
      <section className="bg-brand-dark py-16 text-brand-cream md:py-20">
        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 className="text-3xl font-bold">Découvrez nos artistes</h2>
            <p className="mt-3 max-w-xl text-brand-muted">
              Parcourez le roster LineOut Records et plongez dans l&apos;univers
              de chaque projet artistique.
            </p>
          </div>
          <CtaButton href="/artistes">Voir les artistes</CtaButton>
        </div>
      </section>

      {/* CTA contact */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-dark">
            Un projet en tête ?
          </h2>
          <p className="mt-4 text-lg text-brand-mid">
            Demande d&apos;informations, devis studio ou simple question —
            écrivez-nous, nous vous répondons rapidement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaButton href="/contact">Nous contacter</CtaButton>
            <CtaButton href="/about" variant="outline">
              En savoir plus
            </CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
