"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/utils/connectToDB";
import { Productions } from "@/lib/models/productions";
import { PRODUCTION_TYPES } from "@/lib/types/production";

function getString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function isProductionType(value: string): value is (typeof PRODUCTION_TYPES)[number] {
  return (PRODUCTION_TYPES as readonly string[]).includes(value);
}

export async function createProduction(formData: FormData) {
  const title = getString(formData.get("title"));
  const artistId = getString(formData.get("artistId"));
  const description = getString(formData.get("description"));
  const type = getString(formData.get("type"));
  const releaseDate = getString(formData.get("releaseDate"));
  const genre = getString(formData.get("genre"));
  const image = getString(formData.get("image"));

  if (!title || !artistId || !description || !type || !releaseDate || !image) {
    redirect("/admin/productions?error=missing-fields");
  }

  if (!isProductionType(type)) {
    redirect("/admin/productions?error=invalid-type");
  }

  try {
    await connectToDB();
    await Productions.create({
      title,
      artist: artistId,
      description,
      type,
      releaseDate: new Date(releaseDate),
      genre: genre || undefined,
      image,
    });
  } catch {
    redirect("/admin/productions?error=server");
  }

  revalidatePath("/release");
  revalidatePath("/admin/productions");
  redirect("/admin/productions?success=created");
}

export async function updateProduction(formData: FormData) {
  const id = getString(formData.get("id"));
  const title = getString(formData.get("title"));
  const artistId = getString(formData.get("artistId"));
  const description = getString(formData.get("description"));
  const type = getString(formData.get("type"));
  const releaseDate = getString(formData.get("releaseDate"));
  const genre = getString(formData.get("genre"));
  const image = getString(formData.get("image"));

  if (!id || !title || !artistId || !description || !type || !releaseDate || !image) {
    redirect("/admin/productions?error=missing-fields");
  }

  if (!isProductionType(type)) {
    redirect("/admin/productions?error=invalid-type");
  }

  try {
    await connectToDB();
    await Productions.findByIdAndUpdate(id, {
      title,
      artist: artistId,
      description,
      type,
      releaseDate: new Date(releaseDate),
      genre: genre || undefined,
      image,
    });
  } catch {
    redirect("/admin/productions?error=server");
  }

  revalidatePath("/release");
  revalidatePath("/admin/productions");
  redirect("/admin/productions?success=updated");
}

export async function deleteProduction(formData: FormData) {
  const id = getString(formData.get("id"));

  if (!id) {
    redirect("/admin/productions?error=missing-fields");
  }

  try {
    await connectToDB();
    await Productions.findByIdAndDelete(id);
  } catch {
    redirect("/admin/productions?error=server");
  }

  revalidatePath("/release");
  revalidatePath("/admin/productions");
  redirect("/admin/productions?success=deleted");
}
