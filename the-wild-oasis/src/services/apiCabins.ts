import { Tables } from "../types/supabase";
import supabase, { supabaseUrl } from "./supabase";
type Cabin = Tables<"cabins">;
type NewCabinPayload = Omit<Cabin, "image"> & { image: FileList };

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createCabin(cabinData: NewCabinPayload) {
  const file = cabinData.image?.[0];
  if (!file) throw new Error("No image provided");
  const imageName = `${Math.random()}-${cabinData.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create Cabin
  //https://ykbsjxhdbmovuynnxtfs.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?width=800&quality=80
  const { error, data } = await supabase
    .from("cabins")
    .insert({
      ...cabinData,
      image: imagePath,
    })
    .select();
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
    await deleteCabin(data[0].id);
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
