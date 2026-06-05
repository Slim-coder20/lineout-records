/**
 * =============================================================================
 * MODÈLE ARTISTES — lib/models/artists.ts
 * =============================================================================
 * QUOI   : Schéma MongoDB pour les artistes du roster.
 * POURQUOI : Définit structure + génération auto du slug pour les URLs propres.
 * =============================================================================
 */
import mongoose from "mongoose";
import slugify from "slugify";

const artistsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    // slug = identifiant URL (ex: "slim-abida" → /artistes/slim-abida)
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

/**
 * Hook Mongoose : s'exécute automatiquement AVANT chaque .save().
 * Génère le slug depuis le nom si absent, gère les doublons.
 */
artistsSchema.pre("save", async function () {
  if (!this.slug) {
    // "Slim Abida" → "slim-abida"
    const slugArtist = slugify(this.name, { lower: true, strict: true });
    this.slug = slugArtist;

    // Si le slug existe déjà, ajoute l'ID pour le rendre unique
    const existingArtist = await Artists.findOne({ slug: slugArtist });
    if (existingArtist) {
      this.slug = `${slugArtist}-${existingArtist._id}`;
    }
  }
});

export const Artists =
  mongoose.models?.Artists || mongoose.model("Artists", artistsSchema);
