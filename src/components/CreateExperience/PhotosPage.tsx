import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const PhotosPage = () => {
  return (
    <div>
      <div>PhotosPage</div>
      <FormLabel text="Select photos that represent your experience" />
      <InputField
        id="photos"
        name="photos"
        type="text"
        placeholder="photo url's"
      />
    </div>
  );
};

export default PhotosPage;
