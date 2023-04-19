// utils/uploadImage.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "~/lib/supabase";

export const uploadImageToBucket = async (file: File, userId: string) => {
  const uniqueFileName = `${userId}/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(uniqueFileName, file);

  if (error) {
    throw error;
  }

  return data.path;
};

export const getImagesFromBucket = async (userId: string) => {
  const { data, error } = await supabase.storage
    .from("Images")
    .list(userId + "/");

  if (error) {
    throw error;
  }

  return data;
};
