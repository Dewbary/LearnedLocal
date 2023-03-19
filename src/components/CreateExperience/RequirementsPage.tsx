import React from "react";
import { FormLabel, InputField } from "../CreateExperience";

const RequirementsPage = () => {
  return (
    <div>
      <div>RequirementsPage</div>
      <FormLabel text="Provided Materials" />
      <InputField
        id="provided"
        name="provided"
        type="text"
        placeholder="What materials will you provide?"
      />

      <FormLabel text="Guest Requirements" />
      <InputField
        id="guestRequirements"
        name="guestRequirements"
        type="text"
        placeholder="What do the guests need to prepare beforehand?"
      />

      <FormLabel text="Activity Level" />
      <InputField
        id="activityLevel"
        name="activityLevel"
        type="text"
        placeholder="What activity level does this experience involve?"
      />

      <FormLabel text="Skill Level" />
      <InputField
        id="skillLevel"
        name="skillLevel"
        type="text"
        placeholder="What skill level does this experience involve?"
      />
    </div>
  );
};

export default RequirementsPage;
