import React from "react";
import { FormLabel, InputField } from "../CreateExperience";
import FormPageHeader from "./Typography/Typography";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-3xl px-4">
        <FormPageHeader
          step={2}
          title="We would like to know a little more about you"
          subtitle="As people get to know you, they will be more willing to join your experience"
        />

        <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <div>
            <FormLabel text="FirstName" className="text-gray-600" />
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
            />
          </div>

          <div>
            <FormLabel text="LastName" className="text-gray-600" />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <div>
            <FormLabel text="Profile Picture" className="text-gray-600" />
            <InputField
              id="profilePic"
              name="profilePic"
              type="text"
              placeholder="Profile Picture Path"
            />
          </div>

          <div>
            <FormLabel text="Qualifications" className="text-gray-600" />
            <InputField
              id="qualifications"
              name="qualifications"
              type="text"
              placeholder="What qualifies you to create this experience?"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
