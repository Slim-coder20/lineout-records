/**
 * =============================================================================
 * MODÈLE CONTACT — lib/models/contact.ts
 * =============================================================================
 * QUOI   : Schéma MongoDB pour les messages du formulaire /contact.
 * POURQUOI : Historise chaque demande en base (consultation admin future).
 * =============================================================================
 */
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    // enum : seules "infos" et "devis" sont acceptées
    requestType: {
      type: String,
      required: true,
      enum: ["infos", "devis"],
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models?.Contact || mongoose.model("Contact", contactSchema);
