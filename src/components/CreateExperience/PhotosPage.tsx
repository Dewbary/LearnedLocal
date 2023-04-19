import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import FormPageHeader from "./Typography/Typography";
import { uploadImageToBucket } from "~/utils/images";
import { useUser, useClerk } from "@clerk/nextjs";

type Props = {
  handleImageSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PhotosPage = ({ handleImageSelected }: Props) => {
  return (
    <div>
      <FormPageHeader
        step={7}
        title="Show off your experience"
        subtitle="Trust us, people want to know what you can do"
      />

      <FormLabel text="Select Image" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageSelected}
        className="file-input-bordered file-input-primary file-input w-full max-w-xs"
      />
    </div>
  );
};

export default PhotosPage;
