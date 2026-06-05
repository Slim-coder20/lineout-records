/**
 * =============================================================================
 * DONNÉES ARTISTES — lib/data/artists.ts
 * =============================================================================
 * QUOI   : Fonctions pour lire les artistes depuis MongoDB.
 * POURQUOI : Couche intermédiaire entre Mongoose et les pages React.
 * =============================================================================
 */
import { connectToDB } from "@/lib/utils/connectToDB";
import { Artists } from "@/lib/models/artists";
import type { ArtistDTO } from "@/lib/types/artist";

// Forme brute d'un document MongoDB avant conversion
type ArtistDocument = {
  _id: { toString(): string };
  name: string;
  description: string;
  image: string;
  slug: string;
};

/** Convertit un document MongoDB en objet simple pour React (DTO). */
function toArtistDTO(doc: ArtistDocument): ArtistDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    image: doc.image,
    slug: doc.slug,
  };
}

/** Liste tous les artistes triés par nom (A→Z). Utilisé par /artistes. */
export async function getArtists(): Promise<ArtistDTO[]> {
  await connectToDB();
  const artists = await Artists.find().sort({ name: 1 }).lean<ArtistDocument[]>();
  return artists.map(toArtistDTO);
}

/** Récupère un artiste par son slug URL. Utilisé par /artistes/[slug]. */
export async function getArtistBySlug(slug: string): Promise<ArtistDTO | null> {
  await connectToDB();
  const artist = await Artists.findOne({ slug }).lean<ArtistDocument | null>();
  return artist ? toArtistDTO(artist) : null;
}
