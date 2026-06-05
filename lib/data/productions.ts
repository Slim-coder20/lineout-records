/**
 * =============================================================================
 * COUCHE DONNÉES PRODUCTIONS — lib/data/productions.ts
 * =============================================================================
 * QUOI   : Fonctions pour lire les productions depuis MongoDB.
 * POURQUOI : Sépare la logique base de données de l'affichage (pages React).
 *            Même pattern que lib/data/artists.ts.
 * =============================================================================
 */
import { connectToDB } from "@/lib/utils/connectToDB";
import { Productions } from "@/lib/models/productions";
import type {
  ProductionArtistDTO,
  ProductionDTO,
  ProductionType,
} from "@/lib/types/production";

// Forme brute de l'artiste après .populate() — avant conversion en DTO
type PopulatedArtistDocument = {
  _id: { toString(): string };
  name: string;
  slug: string;
};

// Forme brute d'un document MongoDB (avec artiste peuplé ou null)
type ProductionDocument = {
  _id: { toString(): string };
  title: string;
  description: string;
  type: ProductionType;
  releaseDate: Date;
  genre?: string;
  image: string;
  artist: PopulatedArtistDocument | null; // null si l'artiste a été supprimé
};

// Convertit un document artiste MongoDB → ProductionArtistDTO (objet simple)
function toProductionArtistDTO(
  doc: PopulatedArtistDocument
): ProductionArtistDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
  };
}

// Convertit un document production MongoDB → ProductionDTO (objet pour React)
function toProductionDTO(doc: ProductionDocument): ProductionDTO {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    type: doc.type,
    // toISOString() : Date JS → string standard utilisable partout
    releaseDate: doc.releaseDate.toISOString(),
    genre: doc.genre,
    image: doc.image,
    // doc.artist! : on sait qu'il existe grâce au .filter() plus bas
    artist: toProductionArtistDTO(doc.artist!),
  };
}

/**
 * Récupère toutes les productions triées par date (plus récentes en premier).
 * Utilisée par : app/release/page.tsx
 */
export async function getProductions(): Promise<ProductionDTO[]> {
  // 1. Ouvrir la connexion MongoDB (réutilise si déjà connecté)
  await connectToDB();

  // 2. Requête Mongoose :
  //    - find() : tous les documents
  //    - populate("artist") : remplace l'ObjectId par les champs name + slug
  //    - sort({ releaseDate: -1 }) : tri décroissant (récent → ancien)
  //    - lean() : retourne des objets JS simples (plus rapide, pas de méthodes Mongoose)
  const productions = await Productions.find()
    .populate("artist", "name slug")
    .sort({ releaseDate: -1 })
    .lean<ProductionDocument[]>();

  // 3. Filtre les productions sans artiste (référence cassée) puis convertit en DTO
  return productions
    .filter((production) => production.artist)
    .map(toProductionDTO);
}
