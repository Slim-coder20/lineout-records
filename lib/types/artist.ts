/**
 * =============================================================================
 * TYPE ARTISTE — lib/types/artist.ts
 * =============================================================================
 * QUOI   : Forme des données artiste exposées aux pages React.
 * POURQUOI : Contrat TypeScript entre MongoDB et le front (ArtistDTO).
 * =============================================================================
 */
export type ArtistDTO = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string; // utilisé dans l'URL /artistes/[slug]
};
