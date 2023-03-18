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
          <FormLabel text="Experience Title" />
          <InputField
            id="title"
            name="title"
            type="text"
            placeholder="experience title"
          />

          <FormLabel text="Experience Description" />
          {/* <InputField
            id="description"
            name="description"
            type="text"
            placeholder="experience description"
          /> */}

          <Field
            className="textarea-bordered textarea w-full"
            id="description"
            name="description"
            as="textarea"
            placeholder="Briefly describe what your experience offers"
          />

          <FormLabel text="Experience Location" />
          <InputField
            id="location"
            name="location"
            type="text"
            placeholder="experience location"
          />

          <FormLabel text="Date" />
          <InputField
            id="date"
            name="date"
            type="text"
            placeholder="input date"
          />

          <FormLabel text="Time" />
          <InputField
            id="time"
            name="time"
            type="text"
            placeholder="input time"
          />

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

          {/* <FormLabel text="Experience Price" />
          <InputField id="price" name="price" type="number" /> */}
          <FormLabel text="Experience Price" />
          <label className="input-group">
            <Field
              name="price"
              type="number"
              placeholder="0"
              className="input-bordered input mb-5"
            />
            <span className="mb-5">USD</span>
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

          <FormLabel text="Select Image" />
          <input
            type="file"
            className="file-input-bordered file-input-primary file-input w-full max-w-xs"
          />

          <select className="select-bordered select my-5 w-full max-w-xs">
            <option disabled selected>
              Select Category
            </option>
            <option>Outdoors</option>
            <option>Cooking</option>
            <option>Art</option>
            <option>Tech</option>
            <option>Other</option>
          </select>
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

// const TextInput = ({label, name, type, placeholder}: TextInputProps) => {

//   const [field, meta] = useField([name, type, placeholder]);

//   return (
//     <>
//       <label htmlFor={name}>{label}</label>
//       <input className="text-input" type={type} placeholder={placeholder} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// }

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
    className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
  />

  // <>

  //   <input
  //     id={id}
  //     type={type}
  //     placeholder={placeholder}
  //     className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
  //     value={value}
  //     onChange={onChange}
  //   />
  // </>
);

type FormLabelProps = {
  text: string;
};

export const FormLabel = ({ text }: FormLabelProps) => (
  <>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
      {text}
    </label>
  </>
);
