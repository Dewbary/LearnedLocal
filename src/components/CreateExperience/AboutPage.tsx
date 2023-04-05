import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import FormPageHeader from "./Typography/Typography";

const AboutPage = () => {
  return (
    <div>
      <FormPageHeader
        step={2}
        title="We would like to know a little more about you"
        subtitle="As people get to know you, they will be more willing to join your experience"
      />

      <FormLabel text="FirstName" />
      <InputField
        id="firstName"
        name="firstName"
        type="text"
        placeholder="First Name"
      />

      <FormLabel text="LastName" />
      <InputField
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Last Name"
      />

      <FormLabel text="Profile Picture" />
      <InputField
        id="profilePic"
        name="profilePic"
        type="text"
        placeholder="Profile Picture Path"
      />

      <FormLabel text="Qualifications" />
      <InputField
        id="qualifications"
        name="qualifications"
        type="text"
        placeholder="What qualifies you to create this experience?"
      />
    </div>
  );
};

export default AboutPage;
