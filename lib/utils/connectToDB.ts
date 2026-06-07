/**
 * =============================================================================
 * CONNEXION MONGODB — lib/utils/connectToDB.ts
 * =============================================================================
 * QUOI   : Ouvre (ou réutilise) la connexion Mongoose à MongoDB Atlas.
 * POURQUOI : En dev, Next.js recharge souvent le code → sans ce pattern,
 *            on créerait des dizaines de connexions. readyState vérifie si
 *            une connexion existe déjà (0=déconnecté, 1=connecté).
 * =============================================================================
 */
import mongoose from "mongoose";
// Enregistre tous les schémas avant populate() — requis en prod (bundles serverless)
import "@/lib/models/artists";
import "@/lib/models/contact";
import "@/lib/models/productions";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGO_URI est manquante. Définissez-la dans .env.local"
    );
  }

  // Connexion déjà active → on la réutilise
  if (mongoose.connection.readyState) {
    console.log("Using existing connection", mongoose.connection.name);
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
