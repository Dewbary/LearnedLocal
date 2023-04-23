// utils/uploadImage.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "~/lib/supabase";
import { env } from "~/env.mjs";

export const uploadImageToBucket = async (file: File, userId: string) => {
  const uniqueFileName = `${userId}/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from("experience-photos")
    .upload(uniqueFileName, file);

  if (error) {
    throw error;
  }

  return data.path;
};

export const getImageUrl = async (path: string) => {
  const { data } = supabase.storage.from("experience-photos").getPublicUrl(path);
  const { publicUrl } = data;

  // if (error) {
  //   throw error;
  // }

  return publicUrl;
};
