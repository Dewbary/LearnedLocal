// utils/uploadImage.ts
import { v4 as uuidv4 } from "uuid";
import { supabase } from "~/lib/supabase";
import { env } from "~/env.mjs";

export const uploadImageToBucket = async (file: File, userId: string) => {
  const uniqueFileName = `${userId}/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from(env.SUPABASE_PUBLIC_BUCKET_NAME)
    .upload(uniqueFileName, file);

  if (error) {
    throw error;
  }

  return data.path;
};

export const getImageUrl = (path: string) => {
  const { data } = supabase.storage.from(env.SUPABASE_PUBLIC_BUCKET_NAME).getPublicUrl(path);
  const { publicUrl } = data;

  return publicUrl;
};
