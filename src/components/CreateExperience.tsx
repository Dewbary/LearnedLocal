import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { Formik, Form, useField, useFormikContext, Field } from "formik";
import * as Yup from "yup";

const CreateExperience = () => {
  const { data: experiences, isLoading } = api.experience.getAll.useQuery();
  const createExperience = api.experience.create.useMutation();

  return (
    <div className="mx-5 mt-5 grid grid-cols-2 ">
      {/* List Experiences */}
      {/* <div className="flex flex-col gap-4">
        {experiences?.map((entry, index) => {
          return (
            <div key={index}>
              <p>{entry.title}</p>
              <span>- {entry.content}</span>
            </div>
          );
        })}
      </div> */}

      <Formik
        initialValues={{
          title: "",
          description: "",
          location: "",
          price: 0.0,
          maxAttendees: 10,
          date: "",
          time: "",
          recurring: false, // added for our checkbox
          // category: "" // added for our select
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          // location: Yup.string()
          //   .max(20, "Must be 20 characters or less")
          //   .required("Required"),
          // recurring: Yup.boolean()
          //   .required("Required"),
          // category: Yup.string()
          //   // specify the set of valid values for job type
          //   // @see http://bit.ly/yup-mixed-oneOf
          //   .oneOf(
          //     ["Outdoors", "Art", "Cooking", "Other"],
          //     "Invalid Category"
          //   )
          //   .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // e.preventDefault();
          createExperience.mutate({
            title: values.title,
            content: values.description,
            price: values.price,
          });

          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form className="mb-10">
          <label className="label cursor-pointer">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
              Recurring
            </span>
            <Field
              name="recurring"
              type="checkbox"
              className="checkbox-primary checkbox"
            />
          </label>

          <FormLabel text="Max # of Attendees" />
          <InputField id="maxAttendees" name="maxAttendees" type="number" />

          <FormLabel text="Requirements" />
          <InputField
            id="requirements"
            name="requirements"
            type="text"
            placeholder="materials needed, clothing, etc..."
          />

          <div>
            <button className="btn-primary btn" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>

      {/* Photos */}
      {/* Video */}
      {/* Dates */}

      {/* Time */}

      {/* Reccuring? */}
      {/* Categories */}

      {/* Tags? (for searching) */}
      {/* Rules? */}
    </div>
  );
};

export default CreateExperience;

type InputFieldProps = {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
};

export const InputField = ({
  id,
  name,
  type,
  placeholder,
}: InputFieldProps) => (
  <Field
    id={id}
    name={name}
    type={type}
    placeholder={placeholder}
    className="mb-3 rounded-md border-2 border-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-blue-500 focus:outline-none"
  />
);

type FormLabelProps = {
  text: string;
  className?: string;
};

export const FormLabel = ({ text, className }: FormLabelProps) => (
  <>
    <label
      className={`mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 ${className}`}
    >
      {text}
    </label>
  </>
);
