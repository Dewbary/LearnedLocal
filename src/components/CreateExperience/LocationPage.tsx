import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import LocationPicker from "./LocationPicker/LocationPicker";

const LocationPage = () => {
  return (
    <div>
      <FormLabel text="Location Description" />
      <InputField
        id="locationDescription"
        name="locationDescription"
        type="text"
        placeholder="Are there any specific instructions when arriving at the location?"
      />

      <LocationPicker />
    </div>
  );
};

export default LocationPage;
