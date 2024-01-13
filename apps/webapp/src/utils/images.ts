// utils/uploadImage.ts
import { v4 as uuidv4 } from "uuid";
import { supabase } from "~/lib/supabase";

export const uploadImageToBucket = async (file: File, userId: string) => {
  const uniqueFileName = `${userId}/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME ?? "")
    .upload(uniqueFileName, file);

  if (error) {
    throw error;
  }

  return data.path;
};
