import React, { useEffect } from "react";
import { FormLabel, InputField } from "../CreateExperience";

import { Field, FieldProps } from "formik";
import LocationPicker, { Pin } from "./LocationPicker/LocationPicker";
import { PinContextProvider } from "./LocationPicker/PinContext";
import FormPageHeader from "./Typography/Typography";

type LocationPageProps = {
  location: Pin | null;
  onLocationChange: (location: Pin) => void;
};

const LocationPage = ({ location, onLocationChange }: LocationPageProps) => {
  useEffect(() => {
    if (location) {
      onLocationChange(location);
    }
  }, [location, onLocationChange]);

  return (
    <div>
      <FormPageHeader
        step={5}
        title="Now let's pinpoint the exact location of your experience"
        subtitle="Make sure that it is in a location accessible to those participating"
      />
      <div className="flex-grow place-items-center">
        <Field name="location">
          {(
            { field, form }: FieldProps<Pin> // TODO: Extract into a separate component
          ) => (
            <PinContextProvider>
              <LocationPicker
                {...field}
                onLocationChange={(pin: Pin) => {
                  onLocationChange(pin);
                  form.setFieldValue("location", pin);
                }}
              />
            </PinContextProvider>
          )}
        </Field>
      </div>
    </div>
  );
};

export default LocationPage;
