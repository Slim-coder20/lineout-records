/**
 * Accès aux données artistes (couche entre les pages et MongoDB).
 * Retourne des ArtistDTO simples, sans logique Mongoose dans les composants.
 */
import { connectToDB } from "@/lib/utils/connectToDB";
import { Artists } from "@/lib/models/artists";
import type { ArtistDTO } from "@/lib/types/artist";

type ArtistDocument = {
  _id: { toString(): string };
  name: string;
  description: string;
  image: string;
  slug: string;
};

function toArtistDTO(doc: ArtistDocument): ArtistDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    image: doc.image,
    slug: doc.slug,
  };
}

export async function getArtists(): Promise<ArtistDTO[]> {
  await connectToDB();
  const artists = await Artists.find().sort({ name: 1 }).lean<ArtistDocument[]>();
  return artists.map(toArtistDTO);
}

export async function getArtistBySlug(slug: string): Promise<ArtistDTO | null> {
  await connectToDB();
  const artist = await Artists.findOne({ slug }).lean<ArtistDocument | null>();
  return artist ? toArtistDTO(artist) : null;
}
