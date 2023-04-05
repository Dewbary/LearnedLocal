import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import FormPageHeader from "./Typography/Typography";

const RequirementsPage = () => {
  return (
    <div>
      <FormPageHeader
        step={6}
        title="How should your guests prepare for the experience?"
        subtitle="This will ensure that they can get the most out of the experience"
      />
      <FormLabel text="Provided Materials" />
      <InputField
        id="provided"
        name="provided"
        type="text"
        placeholder="What materials will you provide?"
      />

      <FormLabel text="Location Description" />
      <InputField
        id="locationDescription"
        name="locationDescription"
        type="text"
        placeholder="Are there any specific instructions when arriving at the location?"
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
