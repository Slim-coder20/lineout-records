import {
  createProduction,
  deleteProduction,
  updateProduction,
} from "@/app/actions/productions";
import { getArtists } from "@/lib/data/artists";
import { getProductions } from "@/lib/data/productions";
import { PRODUCTION_TYPES } from "@/lib/types/production";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productions — Administration",
  description: "Gérer les productions LineOut Records",
};

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<(typeof PRODUCTION_TYPES)[number], string> = {
  single: "Single",
  album: "Album",
  ep: "EP",
  mixtape: "Mixtape",
  compilation: "Compilation",
  other: "Autre",
};

const ERROR_MESSAGES: Record<string, string> = {
  "missing-fields": "Veuillez remplir tous les champs obligatoires.",
  "invalid-type": "Type de production invalide.",
  server: "Erreur serveur. Réessayez plus tard.",
};

const SUCCESS_MESSAGES: Record<string, string> = {
  created: "Production créée avec succès.",
  updated: "Production mise à jour.",
  deleted: "Production supprimée.",
};

type AdminProductionsPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminProductionsPage({
  searchParams,
}: AdminProductionsPageProps) {
  const { error, success } = await searchParams;
  const [artists, productions] = await Promise.all([
    getArtists(),
    getProductions(),
  ]);
  const errorMessage = error ? ERROR_MESSAGES[error] : null;
  const successMessage = success ? SUCCESS_MESSAGES[success] : null;

  return (
    <div className="bg-brand-cream">
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Administration
          </p>
          <h1 className="mt-2 text-2xl font-bold text-brand-dark">Productions</h1>
          <p className="mt-2 text-sm text-brand-mid">
            Créez, modifiez ou supprimez les releases du label.
          </p>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p
            role="status"
            className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {successMessage}
          </p>
        ) : null}

        <div className="mb-10 rounded-2xl border border-brand-mid/20 bg-white p-8 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)]">
          <h2 className="text-lg font-semibold text-brand-dark">
            Ajouter une production
          </h2>

          {artists.length === 0 ? (
            <p className="mt-4 text-sm text-brand-mid">
              Créez d&apos;abord au moins un artiste avant d&apos;ajouter une production.
            </p>
          ) : (
            <form action={createProduction} className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="create-title" className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input id="create-title" name="title" required className="form-field" />
              </div>
              <div>
                <label htmlFor="create-artist" className="block text-sm font-medium text-gray-700">
                  Artiste
                </label>
                <select id="create-artist" name="artistId" required className="form-field">
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="create-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="create-description"
                  name="description"
                  required
                  className="form-field"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="create-type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select id="create-type" name="type" required className="form-field">
                    {PRODUCTION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {TYPE_LABELS[type]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="create-releaseDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date de sortie
                  </label>
                  <input
                    id="create-releaseDate"
                    name="releaseDate"
                    type="date"
                    required
                    className="form-field"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="create-genre" className="block text-sm font-medium text-gray-700">
                  Genre (optionnel)
                </label>
                <input id="create-genre" name="genre" className="form-field" />
              </div>
              <div>
                <label htmlFor="create-image" className="block text-sm font-medium text-gray-700">
                  URL de la pochette
                </label>
                <input id="create-image" name="image" required className="form-field" />
              </div>
              <button
                type="submit"
                className="w-fit rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep"
              >
                Créer la production
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-brand-dark">
            Productions existantes ({productions.length})
          </h2>

          {productions.length === 0 ? (
            <p className="text-sm text-brand-mid">Aucune production pour le moment.</p>
          ) : (
            productions.map((production) => (
              <article
                key={production.id}
                className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)]"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-brand-dark">{production.title}</h3>
                    <p className="text-xs text-brand-mid">{production.artistName}</p>
                  </div>
                  <form action={deleteProduction}>
                    <input type="hidden" name="id" value={production.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>

                <form action={updateProduction} className="flex flex-col gap-4">
                  <input type="hidden" name="id" value={production.id} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                      name="title"
                      defaultValue={production.title}
                      required
                      className="form-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Artiste</label>
                    <select
                      name="artistId"
                      defaultValue={production.artistId}
                      required
                      className="form-field"
                    >
                      {artists.map((artist) => (
                        <option key={artist.id} value={artist.id}>
                          {artist.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={production.description}
                      required
                      className="form-field"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        name="type"
                        defaultValue={production.type}
                        required
                        className="form-field"
                      >
                        {PRODUCTION_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {TYPE_LABELS[type]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date de sortie
                      </label>
                      <input
                        name="releaseDate"
                        type="date"
                        defaultValue={production.releaseDate}
                        required
                        className="form-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Genre (optionnel)
                    </label>
                    <input
                      name="genre"
                      defaultValue={production.genre ?? ""}
                      className="form-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL de la pochette
                    </label>
                    <input
                      name="image"
                      defaultValue={production.image}
                      required
                      className="form-field"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-fit rounded-lg border border-brand-mid/30 px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep"
                  >
                    Mettre à jour
                  </button>
                </form>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
