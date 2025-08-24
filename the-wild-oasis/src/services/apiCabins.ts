import { Tables } from "../types/supabase";
import supabase, { supabaseUrl } from "./supabase";
type Cabin = Tables<"cabins">;
type NewCabinPayload = Omit<Cabin, "image"> & { image: FileList };
type NewCabinDuplicatePayload = Omit<Cabin, "id" | "created_at">;

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createEditCabin(cabinData: NewCabinPayload, id?: number) {
  const file = cabinData.image?.[0];
  const hasImagePath = file.name?.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${file.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? file.name
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log("imagePath", imagePath);
  console.log("hasImagePath", hasImagePath);
  console.log("imageName", imageName);

  //1. Create Cabin
  //https://ykbsjxhdbmovuynnxtfs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?width=800&quality=80

  const query = !id
    ? supabase.from("cabins").insert({ ...cabinData, image: imagePath }) //Create
    : supabase
        .from("cabins")
        .update({ ...cabinData, image: imagePath })
        .eq("id", id); //Edit

  const { error, data } = await query.select().single();
  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error(error.message);
  }

  //2. Upload Image

  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, file, { contentType: file.type, upsert: false });
  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error(uploadError.message);
  }

  console.log("Cabin created successfully:", data);
  // 3. Delete the cabin if was an error
  if (uploadError) {
    await deleteCabin(data.id);
  }

  return data;
}

export async function deleteCabin(cabinId: number) {
  if (!cabinId) return;

  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    throw new Error(error.message);
  }
}

export async function duplicateCabin(source: NewCabinDuplicatePayload) {
  const payload = {
    name: source.name ? `${source.name} (copy)` : "Untitled (copy)",
    description: source.description,
    discount: source.discount,
    maxCapacity: source.maxCapacity,
    regularPrice: source.regularPrice,
    image: source.image ?? null, // reuse the same public URL
  };

  const { data, error } = await supabase
    .from("cabins")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Cabin;
}
