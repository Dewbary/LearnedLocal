import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import { FormProps } from "./types";

const LocationPage = () => {
  return (
    <div>
      <div>LocationPage</div>
      <FormLabel text="Experience Location" />
      <InputField
        id="location"
        name="location"
        type="text"
        placeholder="experience location"
      />
    </div>
  );
};

export default LocationPage;
