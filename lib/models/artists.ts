import mongoose from "mongoose"; 
import slugify from "slugify"

const artistsSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  }, 
  description: {
    type: String, 
    required: true, 
  }, 
  image: {
    type: String,
    required: true,
  }, 
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });


artistsSchema.pre("save", async function () {
  if (!this.slug) {
    const slugArtist = slugify(this.name, { lower: true, strict: true });
    this.slug = slugArtist;
    const existingArtist = await Artists.findOne({ slug: slugArtist });
    if (existingArtist) {
      this.slug = `${slugArtist}-${existingArtist._id}`;
    }
  }
});


export const Artists = mongoose.models?.Artists || mongoose.model("Artists", artistsSchema);