import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

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

      <FormLabel text="Location Description" />
      <InputField
        id="locationDescription"
        name="locationDescription"
        type="text"
        placeholder="Are there any specific instructions when arriving at the location?"
      />

      <GoogleMap />
    </div>
  );
};

export default LocationPage;
