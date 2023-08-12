import { Field, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { FormLabel } from "../Form/FormLabel";
import { InputField } from "../Form/InputField";
import FormPageHeader from "../Typography/Typography";
import { api } from "~/utils/api";

const DescriptionPage = () => {
  const { data: categories, isLoading } = api.category.getAll.useQuery(
    undefined,
    {
      staleTime: Infinity,
    }
  );
  const { setFieldValue } = useFormikContext();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeNumber = parseInt(e.target.value);
    setFieldValue("categoryId", themeNumber);
  };

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4">
      <FormPageHeader
        step={1}
        title="Let's start with the basics"
        subtitle="We want to understand the big picture of your experience"
      />
      <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <FormLabel text="Enter your experience title" />
          <InputField
            id="title"
            name="title"
            type="text"
            placeholder="Experience title"
            className="w-full"
          />

          <FormLabel text="Select a theme" className="mt-4" />
          <Field
            name="categoryId"
            as="select"
            onChange={handleThemeChange}
            className="mb-3 w-full rounded-md border-2 border-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            {categories
              ? categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))
              : null}
          </Field>
        </div>
        <div>
          <FormLabel text="Experience Description" />
          <Field
            className="h-48 w-full rounded-md border-2 border-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
            id="description"
            name="description"
            as="textarea"
            placeholder="Briefly describe what your experience offers"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
