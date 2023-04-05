import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import FormPageHeader from "./Typography/Typography";

const PhotosPage = () => {
  return (
    <div>
      <FormPageHeader
        step={8}
        title="Show off your experience"
        subtitle="Trust us, people want to know what you can do"
      />

      <FormLabel text="Select Image" />
      <input
        type="file"
        className="file-input-bordered file-input-primary file-input w-full max-w-xs"
      />
    </div>
  );
};

export default PhotosPage;
