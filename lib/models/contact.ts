/**
 * Modèle Mongoose « Contact » : stocke les messages du formulaire /contact.
 * requestType est limité à « infos » ou « devis ».
 */
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
      enum: ["infos", "devis"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const Contact =
  mongoose.models?.Contact || mongoose.model("Contact", contactSchema);
