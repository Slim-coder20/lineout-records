/**
 * =============================================================================
 * LIBELLÉS PRODUCTION — lib/config/productionTypes.ts
 * =============================================================================
 * QUOI   : Traduit les codes MongoDB (single, ep…) en texte affichable.
 * POURQUOI : En base on stocke des codes courts ; sur le site on affiche
 *            « Single », « EP », « Album » en français/anglais lisible.
 * =============================================================================
 */
import type { ProductionType } from "@/lib/types/production";

export const productionTypeLabels: Record<ProductionType, string> = {
  single: "Single",
  album: "Album",
  ep: "EP",
  mixtape: "Mixtape",
  compilation: "Compilation",
  other: "Autre",
};
