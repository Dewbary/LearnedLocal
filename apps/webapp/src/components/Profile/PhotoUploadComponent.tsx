import { FieldHookConfig, useField } from "formik";
import { uploadImageToBucket } from "~/utils/images";
import { useUser } from "@clerk/nextjs";

const PhotoUploadComponent = (props: FieldHookConfig<string>) => {
  const { user } = useUser();
  const [field, meta, helpers] = useField(props);

  const handleProfileImageSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file || !user) return;

    const imgPath = await uploadImageToBucket(file, user.id);
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME
    )
      return;
    const profileImageFilePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME}/${imgPath}`;
    await helpers.setValue(profileImageFilePath);
  };

  return (
    <div className="flex w-fit flex-col items-center gap-6">
      <h3 className="self-start font-bold">Profile Picture</h3>
      <div className="h-32 w-32 overflow-hidden rounded-full">
        {field.value ? (
          <img
            src={field.value}
            className="h-full w-full rounded-full object-cover shadow-lg"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 shadow-lg"></div>
        )}
      </div>

      <input
        id={field.name}
        name={field.name}
        type="file"
        className="file-input-bordered file-input file-input-sm w-full max-w-xs"
        onChange={(e) => {
          void handleProfileImageSelected(e);
        }}
      />
      <div>
        {meta.touched && meta.error && <div>{meta.error?.toString()}</div>}
      </div>
    </div>
  );
};

export default PhotoUploadComponent;
