import {
  createArtist,
  deleteArtist,
  updateArtist,
} from "@/app/actions/artists";
import { getArtists } from "@/lib/data/artists";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artistes — Administration",
  description: "Gérer les artistes LineOut Records",
};

export const dynamic = "force-dynamic";

const ERROR_MESSAGES: Record<string, string> = {
  "missing-fields": "Veuillez remplir tous les champs obligatoires.",
  server: "Erreur serveur. Réessayez plus tard.",
};

const SUCCESS_MESSAGES: Record<string, string> = {
  created: "Artiste créé avec succès.",
  updated: "Artiste mis à jour.",
  deleted: "Artiste supprimé.",
};

type AdminArtistesPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminArtistesPage({
  searchParams,
}: AdminArtistesPageProps) {
  const { error, success } = await searchParams;
  const artists = await getArtists();
  const errorMessage = error ? ERROR_MESSAGES[error] : null;
  const successMessage = success ? SUCCESS_MESSAGES[success] : null;

  return (
    <div className="bg-brand-cream">
      <section className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Administration
          </p>
          <h1 className="mt-2 text-2xl font-bold text-brand-dark">Artistes</h1>
          <p className="mt-2 text-sm text-brand-mid">
            Créez, modifiez ou supprimez les artistes du roster.
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
            Ajouter un artiste
          </h2>
          <form action={createArtist} className="mt-6 flex flex-col gap-5">
            <div>
              <label htmlFor="create-name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="create-name"
                name="name"
                required
                className="form-field"
                placeholder="Slim Abida"
              />
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
                placeholder="Présentation de l'artiste…"
              />
            </div>
            <div>
              <label htmlFor="create-image" className="block text-sm font-medium text-gray-700">
                URL de l&apos;image
              </label>
              <input
                id="create-image"
                name="image"
                required
                className="form-field"
                placeholder="/studios/studio_1.png ou https://…"
              />
            </div>
            <button
              type="submit"
              className="w-fit rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-brand-cream-deep"
            >
              Créer l&apos;artiste
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-brand-dark">
            Artistes existants ({artists.length})
          </h2>

          {artists.length === 0 ? (
            <p className="text-sm text-brand-mid">Aucun artiste pour le moment.</p>
          ) : (
            artists.map((artist) => (
              <article
                key={artist.id}
                className="rounded-2xl border border-brand-mid/20 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(64,80,80,0.35)]"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-brand-dark">{artist.name}</h3>
                    <p className="text-xs text-brand-mid">/artistes/{artist.slug}</p>
                  </div>
                  <form action={deleteArtist}>
                    <input type="hidden" name="id" value={artist.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                    >
                      Supprimer
                    </button>
                  </form>
                </div>

                <form action={updateArtist} className="flex flex-col gap-4">
                  <input type="hidden" name="id" value={artist.id} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      name="name"
                      defaultValue={artist.name}
                      required
                      className="form-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={artist.description}
                      required
                      className="form-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL de l&apos;image
                    </label>
                    <input
                      name="image"
                      defaultValue={artist.image}
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
