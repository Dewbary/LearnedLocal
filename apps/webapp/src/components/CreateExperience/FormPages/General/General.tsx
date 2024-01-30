import * as React from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { api } from "~/utils/api";
import PriceField from "../../SettingsPage/PriceField";
import InputField from "~/components/Account/InputField";
import SelectField from "~/components/common/Fields/SelectField";
import StringArrayInputField from "../../Form/StringArrayInputField";
import type { FormValues } from "../../types";

const General = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const { data: categories } = api.category.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryNumber = parseInt(e.target.value);
    await setFieldValue("categoryId", categoryNumber);
  };

  return (
    <div className="space-y-6">
      <InputField
        name="title"
        displayName="Experience Title"
        type="text"
        placeholder="A short title representing your experience"
        required={true}
        charLimit={25}
        note="Maximum 25 characters"
      />
      <ErrorMessage name="title" component="div" />

      <InputField
        name="description"
        displayName="Description"
        as="textarea"
        placeholder="Provide a brief description on what your experience entails and what attendees can hope to gain from it"
        required={true}
        charLimit={600}
        note="Maximum 600 characters"
      />
      <SelectField
        displayName="Category"
        name="categoryId"
        items={
          categories?.map((category) => ({
            value: category.id,
            name: category.name,
          })) ?? []
        }
        placeholderText="Choose a category"
        required={true}
        onItemSelect={handleCategoryChange}
      />
      <PriceField name="price" displayName="Price Per Guest" required={true} />

      <StringArrayInputField
        title="What's Included"
        arrayName="prepItems"
        arrayObject={values.prepItems}
        placeHolderText="Type in included materials or resources one by one, hitting the plus button in-between"
        note="Maximum 25 characters each"
      />
      <InputField
        name="details"
        displayName="Additional Details"
        as="textarea"
        placeholder="Provide additional details here (disclosures, legal information, etc)"
        charLimit={600}
        note="Maximum 600 characters"
      />
    </div>
  );
};

export default General;
