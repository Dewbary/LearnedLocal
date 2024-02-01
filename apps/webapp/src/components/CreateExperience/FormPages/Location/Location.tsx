import * as React from "react";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { PinContextProvider } from "../../LocationPicker/PinContext";
import LocationPicker from "../../LocationPicker/LocationPicker";
import type { Pin } from "packages/db/types/types";

const Location = () => {
  return (
    <Field name="location">
      {({ field, form }: FieldProps<Pin>) => (
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
  );
};

export default Location;
