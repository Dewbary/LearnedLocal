import * as React from "react";
import { FormLabel } from "../../Form/FormLabel";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { FormValues } from "../../types";

const PriceField = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <div className="flex flex-col">
      <div>
        <FormLabel text="Experience Price" />
        <label className="input-group">
          <Field
            name="price"
            type="number"
            disabled={values.free ?? false}
            placeholder="1.00"
            className="input-bordered input w-full lg:w-52"
          />
          <span className="">USD</span>
        </label>
      </div>
      <div className="ml-4 flex content-center items-center pb-4 pt-2 ">
        <Field name="free" type="checkbox" className="checkbox" />
        <div className="pl-2 text-xs font-bold uppercase text-gray-700">
          My Experience is Free
        </div>
      </div>

      <ErrorMessage name="price" component="div" className="text-red-500" />
    </div>
  );
};

export default PriceField;
