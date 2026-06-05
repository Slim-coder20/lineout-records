import mongoose from "mongoose"; 

/**
 * Modèle Mongoose « Productions » : title, description, image, slug.
 * Le slug est généré automatiquement au save (URL /productions/[slug]).
 */

const productionsSchema = new mongoose.Schema({

  title: {
    type: String, 
    required: true, 
  }, 
  artist: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Artists", 
    required: true, 
  }, 
  description: {
    type: String, 
    required: true, 
  },
  type: {
    type: String, 
    required: true, 
    enum: ["single", "album", "ep", "mixtape", "compilation", "other"],
  },
  releaseDate: {
    type: Date, 
    required: true, 
  },
  genre: {
    type: String, 
    required: false, 
  },
  image: {
    type: String, 
    required: true, 
  }, 
}, { timestamps: true });

export const Productions = mongoose.models.Productions || mongoose.model("Productions", productionsSchema);

