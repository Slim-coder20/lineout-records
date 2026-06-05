/**
 * =============================================================================
 * PAGE À PROPOS — app/about/page.tsx
 * =============================================================================
 * QUOI   : Présentation du studio, valeurs, équipe (/about).
 * POURQUOI : Contenu statique (pas de MongoDB) — texte éditorial + photos.
 * =============================================================================
 */
import brandIcon from "@/app/icon.png";
import CtaButton from "@/components/CtaButton";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — LineOut Records",
  description:
    "Découvrez LineOut Records : studio d'enregistrement, label et accompagnement artistique.",
};

// 4 valeurs fondatrices du studio (affichées en cartes)
const values = [
  {
    title: "Écoute avant tout",
    description:
      "Chaque projet est unique. Nous prenons le temps de comprendre votre univers avant d'entrer en studio.",
  },
  {
    title: "Exigence bienveillante",
    description:
      "Un rendu professionnel, sans perdre l'émotion et l'identité qui font votre musique.",
  },
  {
    title: "Label & studio réunis",
    description:
      "De la prise de son à la sortie : un seul lieu pour créer, produire et diffuser.",
  },
  {
    title: "Esprit collaboratif",
    description:
      "Artistes du roster, invités et nouveaux talents — LineOut est un lieu de rencontres.",
  },
] as const;

// Photos illustrant la page about
const studioPhotos = [
  { src: "/studios/studio_4.png", alt: "Salle de travail LineOut Records" },
  { src: "/studios/studio_6.png", alt: "Installation studio LineOut Records" },
  { src: "/studios/studio_7.png", alt: "Espace créatif LineOut Records" },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-brand-cream">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Notre histoire
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-dark md:text-5xl">
              À propos de LineOut Records
            </h1>
            <p className="max-w-lg text-lg text-brand-mid">
              LineOut Records, c&apos;est un studio et un label indépendant
              dédié aux artistes qui veulent passer de l&apos;idée au disque, avec
              un accompagnement humain et technique à chaque étape.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaButton href="/artistes">Nos artistes</CtaButton>
              <CtaButton href="/contact" variant="secondary">
                Nous contacter
              </CtaButton>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={brandIcon}
              alt="Logo LineOut Records"
              width={280}
              height={280}
              className="rounded-full ring-4 ring-brand-accent/50 shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark">Notre mission</h2>
            <p className="mt-4 leading-relaxed text-brand-mid">
              Offrir un cadre professionnel où les créateurs peuvent
              expérimenter, enregistrer et finaliser leurs projets dans les
              meilleures conditions — sans jargon inutile, avec des interlocuteurs
              passionnés par la musique.
            </p>
            <p className="mt-4 leading-relaxed text-brand-mid">
              Que vous soyez artiste émergent ou projet confirmé, LineOut vous
              propose un parcours clair : préparation, sessions studio, mix,
              mastering et mise en ligne via le label.
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-[0_16px_40px_-16px_rgba(64,80,80,0.3)]">
            <Image
              src="/studios/studio_8.jpeg"
              alt="Vue du studio LineOut Records"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-brand-cream-warm/40 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold text-brand-dark">
              Ce qui nous guide
            </h2>
            <p className="mt-3 text-brand-mid">
              Quatre piliers qui définissent notre façon de travailler avec les
              artistes au quotidien.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <li
                key={value.title}
                className="rounded-xl border border-brand-mid/15 bg-white p-6 transition hover:border-brand-accent/40 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-brand-dark">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-mid">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galerie */}
      <section className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-brand-dark">
            Les lieux de création
          </h2>
          <p className="mt-3 text-brand-mid">
            Un studio conçu pour le confort des sessions longues et la qualité
            d&apos;écoute exigée en mix et en mastering.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {studioPhotos.map((photo) => (
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
      </section>

      {/* Parcours artiste */}
      <section className="bg-brand-dark py-16 text-brand-cream md:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-brand-accent">01</p>
              <h3 className="mt-2 text-lg font-semibold">Premier échange</h3>
              <p className="mt-2 text-sm text-brand-muted">
                On définit ensemble vos objectifs, votre budget et le calendrier
                du projet.
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-accent">02</p>
              <h3 className="mt-2 text-lg font-semibold">Sessions studio</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Enregistrement, direction et suivis techniques dans nos espaces
                dédiés.
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-accent">03</p>
              <h3 className="mt-2 text-lg font-semibold">Sortie & promotion</h3>
              <p className="mt-2 text-sm text-brand-muted">
                Finalisation, distribution via le label et visibilité auprès de
                notre communauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-dark">
            Envie de rejoindre l&apos;aventure ?
          </h2>
          <p className="mt-4 text-lg text-brand-mid">
            Découvrez nos artistes, nos dernières productions ou contactez-nous
            pour parler de votre prochain projet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaButton href="/artistes">Voir les artistes</CtaButton>
            <CtaButton href="/release" variant="outline">
              Nos productions
            </CtaButton>
            <CtaButton href="/contact" variant="secondary">
              Prendre contact
            </CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}
