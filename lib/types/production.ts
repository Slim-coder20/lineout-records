export const PRODUCTION_TYPES = [
  "single",
  "album",
  "ep",
  "mixtape",
  "compilation",
  "other",
] as const;

export type ProductionType = (typeof PRODUCTION_TYPES)[number];

export type ProductionDTO = {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  description: string;
  type: ProductionType;
  releaseDate: string;
  genre?: string;
  image: string;
};
