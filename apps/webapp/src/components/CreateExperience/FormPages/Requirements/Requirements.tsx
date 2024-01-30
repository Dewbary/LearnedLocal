import * as React from "react";
import InputField from "~/components/Account/InputField";
import SelectField from "~/components/common/Fields/SelectField";
import { useFormikContext } from "formik";
import type { FormValues } from "../../types";
import StringArrayInputField from "../../Form/StringArrayInputField";

const Requirements = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const handleSelectSkillLevel = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const skillLevel = parseInt(e.target.value);
    await setFieldValue("skillLevel", skillLevel);
  };

  const handleSelectActivityLevel = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const activityLevel = parseInt(e.target.value);
    await setFieldValue("activityLevel", activityLevel);
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
        name="skill"
        displayName="Skill Level"
        items={[
          { value: 0, name: "Beginner" },
          { value: 1, name: "Intermediate" },
          { value: 2, name: "Advanced" },
          { value: 3, name: "Expert" },
        ]}
        placeholderText="Choose a skill level"
        onItemSelect={handleSelectSkillLevel}
      />
      <SelectField
        name="activity"
        displayName="Activity Level"
        items={[
          { value: 0, name: "Low" },
          { value: 1, name: "Medium" },
          { value: 2, name: "High" },
          { value: 3, name: "Extreme" },
        ]}
        placeholderText="Choose a skill level"
        onItemSelect={handleSelectActivityLevel}
      />
      <InputField
        name="activityDetails"
        displayName=""
        as="textarea"
        placeholder="Provide additional details about the level of activity in this experience if appropriate"
        charLimit={200}
        note="Maximum 200 characters"
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
