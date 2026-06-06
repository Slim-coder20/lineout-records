"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/utils/connectToDB";
import { Artists } from "@/lib/models/artists";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createArtist(formData: FormData) {
  const name = getString(formData.get("name"));
  const description = getString(formData.get("description"));
  const image = getString(formData.get("image"));

  if (!name || !description || !image) {
    redirect("/admin/artistes?error=missing-fields");
  }

  try {
    await connectToDB();
    await Artists.create({ name, description, image });
  } catch {
    redirect("/admin/artistes?error=server");
  }

  revalidatePath("/artistes");
  revalidatePath("/admin/artistes");
  redirect("/admin/artistes?success=created");
}

export async function updateArtist(formData: FormData) {
  const id = getString(formData.get("id"));
  const name = getString(formData.get("name"));
  const description = getString(formData.get("description"));
  const image = getString(formData.get("image"));

  if (!id || !name || !description || !image) {
    redirect("/admin/artistes?error=missing-fields");
  }

  try {
    await connectToDB();
    await Artists.findByIdAndUpdate(id, { name, description, image });
  } catch {
    redirect("/admin/artistes?error=server");
  }

  revalidatePath("/artistes");
  revalidatePath("/admin/artistes");
  redirect("/admin/artistes?success=updated");
}

export async function deleteArtist(formData: FormData) {
  const id = getString(formData.get("id"));

  if (!id) {
    redirect("/admin/artistes?error=missing-fields");
  }

  try {
    await connectToDB();
    await Artists.findByIdAndDelete(id);
  } catch {
    redirect("/admin/artistes?error=server");
  }

  revalidatePath("/artistes");
  revalidatePath("/admin/artistes");
  redirect("/admin/artistes?success=deleted");
}
