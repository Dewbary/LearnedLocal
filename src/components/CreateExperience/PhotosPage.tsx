import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const PhotosPage = () => {
  return (
    <div>
      <div>Photos Page</div>
      <FormLabel text="Select Image" />
      <input
        type="file"
        className="file-input-bordered file-input-primary file-input w-full max-w-xs"
      />
    </div>
  );
};

export default PhotosPage;
