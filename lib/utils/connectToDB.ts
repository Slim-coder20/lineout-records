/**
 * Connexion unique à MongoDB via Mongoose.
 * Réutilise la connexion existante en dev pour éviter les reconnexions au hot reload.
 */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


export async function connectToDB () {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGO_URI est manquante. Définissez-la dans .env.local"
    );
  }

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