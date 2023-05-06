import React from "react";
import { FormLabel } from "./Form/FormLabel";
import { InputField } from "./Form/InputField";
import FormPageHeader from "./Typography/Typography";

const RequirementsPage = () => {
  return (
    <div className="">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <FormPageHeader
          step={5}
          title="How should your guests prepare for the experience?"
          subtitle="This will ensure that they can get the most out of the experience"
        />
        <div className="rounded-lg bg-white p-8 shadow-md">
          <FormLabel text="Provided Materials" />
          <InputField
            id="provided"
            name="provided"
            type="text"
            placeholder="What materials will you provide?"
            className="w-full"
          />

          <FormLabel text="Location Description" />
          <InputField
            id="locationDescription"
            name="locationDescription"
            type="text"
            placeholder="Are there any specific instructions when arriving at the location?"
            className="w-full"
          />

          <FormLabel text="Guest Requirements" />
          <InputField
            id="guestRequirements"
            name="guestRequirements"
            type="text"
            placeholder="What do the guests need to prepare beforehand?"
            className="w-full"
          />

          <FormLabel text="Activity Level" />
          <InputField
            id="activityLevel"
            name="activityLevel"
            type="text"
            placeholder="What activity level does this experience involve?"
            className="w-full"
          />

          <FormLabel text="Skill Level" />
          <InputField
            id="skillLevel"
            name="skillLevel"
            type="text"
            placeholder="What skill level does this experience involve?"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RequirementsPage;
