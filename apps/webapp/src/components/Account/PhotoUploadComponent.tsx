import { type FieldHookConfig, useField } from "formik";
import { uploadImageToBucket } from "~/utils/images";
import { useUser } from "@clerk/nextjs";
import { UserIcon } from "@heroicons/react/24/outline";
import { Typography } from "../common/Typography";

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
    <div className="flex flex-col w-full gap-3">
      <h2 className={Typography.InputLabel}>PROFILE PHOTO</h2>
      <div className="flex w-full flex-row items-center gap-6">
        <div className={`h-28 w-28 overflow-hidden rounded-full ${field.value ? "" : "border border-ll-black"}`}>
          {field.value ? (
            <img
              src={field.value}
              className="h-full w-full rounded-full object-cover"
              alt=""
            />
          ) : (
            <div className="h-full w-full bg-ll-grey flex flex-col items-center justify-center">
              <UserIcon width={50}/>
            </div>
          )}
        </div>

        <label>
          <div className="rounded-lg border border-ll-black py-2 px-4 hover:border-ll-grey hover:bg-ll-black hover:text-ll-grey transition-colors hover:cursor-pointer">
            <span className={Typography.ButtonText}>{field.value ? "Change profile picture" : "Add profile picture"}</span>
          </div>
          <input
            id={field.name}
            name={field.name}
            type="file"
            className="hidden"
            onChange={(e) => {
              void handleProfileImageSelected(e);
            }}
          />
        </label>
        
        <div>
          {meta.touched && meta.error && <div>{meta.error?.toString()}</div>}
        </div>
      </div>
    </div>
    
  );
};

export default PhotoUploadComponent;
