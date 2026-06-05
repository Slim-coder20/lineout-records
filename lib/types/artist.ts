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