import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const SettingsPage = () => {
  return (
    <div>
      <div>SettingsPage</div>
      <FormLabel text="Minimum Age" />
      <InputField
        id="minAge"
        name="minAge"
        type="number"
        placeholder="min age"
      />

      <FormLabel text="Price" />
      <InputField id="price" name="price" type="number" placeholder="Price" />

      <FormLabel text="Max Attendees" />
      <InputField
        id="maxAttendees"
        name="maxAttendees"
        type="number"
        placeholder="max number of people that can attend your experience"
      />
    </div>
  );
};

export default SettingsPage;
