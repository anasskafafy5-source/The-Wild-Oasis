import { supabase } from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could Not Access to The Cabins Data");
  }

  return data;
}

//for adding new cabin or editing
export async function createEditCabin(newCabin, id) {
  // const hasImagePath = newCabin?.image?.startsWith(supabaseUrl);
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //1. create/edit the capin
  let query = supabase.from("cabins");

  //[A] for create if there is no id
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //[B] For Edit
  if (id)
    query = query
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cannot add cabin right now. Please try again later.");
  }

  //2. upload the photo
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // delete the cabin if there is error in uploading the image
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabin image can not uploaded right, now try later");
  }

  return data;
}

// for deleting
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("can not deleted right now, try later.");
  }

  return data;
}
