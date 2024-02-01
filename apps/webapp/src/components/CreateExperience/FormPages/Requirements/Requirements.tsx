import * as React from "react";
import InputField from "~/components/Account/InputField";
import SelectField from "~/components/common/Fields/SelectField";
import { useFormikContext } from "formik";
import type { FormValues } from "../../types";
import StringArrayInputField from "../../Form/StringArrayInputField";
import { ACTIVITY_LEVELS, SKILL_LEVELS } from "../../CreateExperienceFormUtils";

const Requirements = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const handleSelectSkillLevel = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await setFieldValue("skillLevel", e.target.value);
  };

  const handleSelectActivityLevel = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await setFieldValue("activityLevel", e.target.value);
  };

  return (
    <div className="space-y-4">
      <InputField
        name="maxAttendees"
        displayName="Maximum # of Guests"
        type="number"
        placeholder="Max number of people that can attend your experience"
        min={0}
        required={true}
      />
      <InputField
        name="minAge"
        displayName="Age Requirement"
        type="number"
        placeholder="Minimum age requirement"
        min={0}
        required={true}
      />
      <SelectField
        name="skillLevel"
        displayName="Skill Level"
        items={SKILL_LEVELS}
        placeholderText="Choose a skill level"
        onItemSelect={handleSelectSkillLevel}
      />
      <SelectField
        name="activityLevel"
        displayName="Activity Level"
        items={ACTIVITY_LEVELS}
        placeholderText="Choose a skill level"
        onItemSelect={handleSelectActivityLevel}
      />
      {/* <InputField
        name="activityNotes"
        displayName=""
        as="textarea"
        placeholder="Provide additional details about the level of activity in this experience if appropriate"
        charLimit={200}
        note="Maximum 200 characters"
      /> */}
      <StringArrayInputField
        title="Additional Activity Details"
        arrayName="activityNotes"
        arrayObject={values.activityNotes}
        placeHolderText="Provide additional details about the level of activity in this experience if appropriate"
      />
      <StringArrayInputField
        title="How to Prepare"
        arrayName="prepItems"
        arrayObject={values.prepItems}
        placeHolderText="Type in ways your attendees can prepare one by one, hitting the plus button in-between"
      />
    </div>
  );
};

export default Requirements;
