import React from "react";
import FormPageHeader from "../Typography/Typography";
import { Field, useFormikContext } from "formik";
import StringArrayInputField from "../Form/StringArrayInputField";
import type { FormValues } from "../types";

const RequirementsPage = () => {

  const { values } = useFormikContext<FormValues>();

  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={4}
        title="How should your guests prepare for the experience?"
        subtitle="This will ensure that they can get the most out of the experience."
      />
      <div className="rounded-lg bg-white p-8 shadow-md flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-bold">ACTIVITY SKILL LEVEL</h2>
          <p className="text-sm">How knowledgeable or skilled do the participants need to be on your topic before they take the class or experience you are hosting?</p>
          <Field name="skillLevel" as="select" className="w-40 rounded-md border-2 border-gray-200 py-2 px-4 text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:outline-none hover:cursor-pointer">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Field>
        </div>

        <div className="divider" />

        <StringArrayInputField
          title="WHAT THEY'LL NEED"
          description="List the things your guests will need to bring to be ready for your experience, if anything!"
          arrayName="prepItems"
          arrayObject={values.prepItems}
          placeHolderText="List an item your guests need, e.g. A good pair of hiking boots."
        />

        <div className="divider" />

        <StringArrayInputField
          title="WHAT'S INCLUDED"
          description="List the things that your guests will learn, make, and receive as a part of the experience!"
          arrayName="includedItems"
          arrayObject={values.includedItems}
          placeHolderText="List something you'll give to your guests, e.g. Your own landscape painting or An understanding of basic blacksmithing"
        />

        <div className="divider" />

        <StringArrayInputField
          title="ACTIVITY NOTES"
          description="List some things that your guests should be prepared for physically as a part of your experience."
          arrayName="activityNotes"
          arrayObject={values.activityNotes}
          placeHolderText="E.g. 2 hours of standing or Must be able to carry 30 lbs. overhead"
        />

        <div className="divider" />

        <div className="flex flex-col gap-2">
          <h2 className="text-md font-bold">ADDITIONAL INFORMATION</h2>
          <p className="text-sm">If you have any additional information for your guests, such as legal disclosures, a more detailed itinerary, etc., please put it here.</p>
          <Field
            className="h-48 w-full rounded-md border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
            id="additionalInformation"
            name="additionalInformation"
            as="textarea"
            placeholder="Disclosures, additional preparation steps, links, etc."
          />
        </div>

      {/* <div className="w-full flex flex-col gap-3">
        <h2 className="font-bold">
          WHAT THEY&apos;LL NEED
        </h2>
        <h3 className="text-sm">
          List the things your guests will need to bring to be ready for your experience, if anything!
        </h3>
        <FieldArray name="prepItems">
          {({ remove, push, form }) => (
            <div className="flex flex-col gap-3 items-start w-full">
              {form.values.prepItems.map((prepItem: string, index: number) => (
                <div className="flex flex-row gap-2 items-center w-full">
                  <Field name={`prepItems.${index}`} placeholder="Add a prep item" className="w-full rounded-md border-2 border-gray-200 py-2 px-4 text-gray-700 focus:border-blue-500 focus:outline-none"/>
                  <button onClick={() => remove(index)} className="bg-red-400 w-8 h-8 drop-shadow-sm rounded-md">&#10005;</button>
                </div>
              ))}
              <button onClick={() => push("")} className="bg-blue-400 w-8 h-8 drop-shadow-sm rounded-md text-white text-xl">+</button>
            </div>
          )}
        </FieldArray>
      </div> */}


        {/* <FormLabel text="Provided Materials" />
        <InputField
          id="provided"
          name="provided"
          type="text"
          placeholder="What materials will you provide, if any?"
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
          placeholder="How physically intense is this experience? E.g. carry 30 lb objects, stand for 3 hours, etc."
          className="w-full"
        />

        <FormLabel text="Skill Level" />
        <InputField
          id="skillLevel"
          name="skillLevel"
          type="text"
          placeholder="E.g. 'Beginner friendly', 'Some artistic experience required', or 'Seasoned chess veterans'"
          className="w-full"
        /> */}
      </div>
    </div>
  );
};

export default RequirementsPage;
