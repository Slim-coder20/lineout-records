import { connectToDB } from "@/lib/utils/connectToDB";
import { Productions } from "@/lib/models/productions";
import type { ProductionDTO, ProductionType } from "@/lib/types/production";

type ProductionDocument = {
  _id: { toString(): string };
  title: string;
  artist: { _id: { toString(): string }; name: string; slug: string } | null;
  description: string;
  type: ProductionType;
  releaseDate: Date;
  genre?: string;
  image: string;
};

function toProductionDTO(doc: ProductionDocument): ProductionDTO {
  return {
    id: doc._id.toString(),
    title: doc.title,
    artistId: doc.artist?._id.toString() ?? "",
    artistName: doc.artist?.name ?? "Artiste inconnu",
    artistSlug: doc.artist?.slug ?? "",
    description: doc.description,
    type: doc.type,
    releaseDate: doc.releaseDate.toISOString().slice(0, 10),
    genre: doc.genre,
    image: doc.image,
  };
}

export async function getProductions(): Promise<ProductionDTO[]> {
  await connectToDB();
  const productions = await Productions.find()
    .populate("artist", "name slug")
    .sort({ releaseDate: -1 })
    .lean<ProductionDocument[]>();

  return productions.map(toProductionDTO);
}
