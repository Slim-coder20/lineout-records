/**
 * =============================================================================
 * MODÈLE MONGOOSE PRODUCTIONS — lib/models/productions.ts
 * =============================================================================
 * QUOI   : Schéma MongoDB pour les releases (singles, EP, albums…).
 * POURQUOI : Définit la structure en base + règles de validation Mongoose.
 * NOTE   : artist est une référence (ObjectId) vers la collection Artists.
 * =============================================================================
 */
import mongoose from "mongoose";

// Schéma = « plan » de chaque document dans la collection « productions »
const productionsSchema = new mongoose.Schema(
  {
    // Titre de la release (ex: "The Beginnings")
    title: {
      type: String,
      required: true,
    },

    // Référence vers un artiste existant (lien entre production ↔ artiste)
    // ref: "Artists" permet d'utiliser .populate("artist") pour récupérer le nom
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artists",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // enum : seules ces valeurs sont acceptées en base
    type: {
      type: String,
      required: true,
      enum: ["single", "album", "ep", "mixtape", "compilation", "other"],
    },

    // Date de sortie (tri et affichage de l'année sur le front)
    releaseDate: {
      type: Date,
      required: true,
    },

    // Genre musical — optionnel
    genre: {
      type: String,
      required: false,
    },

    // URL de la pochette (chemin local /public ou URL externe)
    image: {
      type: String,
      required: true,
    },
  },
  // timestamps: true → ajoute createdAt et updatedAt automatiquement
  { timestamps: true }
);

// Évite de recréer le modèle à chaque hot reload Next.js (pattern Mongoose standard)
export const Productions =
  mongoose.models.Productions ||
  mongoose.model("Productions", productionsSchema);
