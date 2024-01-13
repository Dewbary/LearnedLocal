import React from "react";
import { Field, type FieldProps } from "formik";
import LocationPicker from "../LocationPicker/LocationPicker";
import { PinContextProvider } from "../LocationPicker/PinContext";
import FormPageHeader from "../Typography/Typography";
import type { Pin } from "@learnedlocal/db/types/types";

const LocationPage = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={3}
        title="Now let's pinpoint the exact location of your experience"
        subtitle="Make sure that it is in a location accessible to those participating"
      />

      <Field name="location">
        {(
          { field, form }: FieldProps<Pin> // TODO: Extract into a separate component
        ) => (
          <PinContextProvider>
            <LocationPicker
              {...field}
              onLocationChange={async (pin: Pin, city?: string | null) => {
                await form.setFieldValue("location", pin);
                await form.setFieldValue("city", city);
              }}
            />
          </PinContextProvider>
        )}
      </Field>
    </div>
  );
};

export default LocationPage;
