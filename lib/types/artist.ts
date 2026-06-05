/**
 * Types TypeScript partagés pour les artistes et (futur) les productions.
 * ArtistDTO = forme des données exposées aux pages React.
 */
export type ArtistDTO = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};


export type ProductionDTO = {
  id : string; 
  tracks: string[];
  artist: string;
  description: string;
  image: string;
  slug: string;
}