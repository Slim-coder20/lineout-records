/**
 * =============================================================================
 * TYPES PRODUCTION — lib/types/production.ts
 * =============================================================================
 * QUOI   : Définit la « forme » des données production côté front (TypeScript).
 * POURQUOI : Les pages React ne manipulent pas directement MongoDB. On définit
 *            un contrat clair (DTO) entre la base et l'interface.
 * =============================================================================
 */

// Liste des types autorisés — doit correspondre à l'enum du modèle Mongoose
export const PRODUCTION_TYPES = [
  "single",
  "album",
  "ep",
  "mixtape",
  "compilation",
  "other",
] as const;

// Type dérivé : "single" | "album" | "ep" | ...
export type ProductionType = (typeof PRODUCTION_TYPES)[number];

// Sous-objet artiste inclus dans chaque production (via populate MongoDB)
export type ProductionArtistDTO = {
  id: string; // _id MongoDB converti en string
  name: string; // nom affiché sur la carte
  slug: string; // pour le lien /artistes/[slug]
};

// Objet complet qu'une page React reçoit pour afficher une production
export type ProductionDTO = {
  id: string;
  title: string;
  description: string;
  type: ProductionType;
  releaseDate: string; // ISO string (ex: "2026-01-15T00:00:00.000Z")
  genre?: string; // optionnel
  image: string; // URL locale (/...) ou externe (Cloudinary…)
  artist: ProductionArtistDTO; // artiste lié (peuplé depuis MongoDB)
};
