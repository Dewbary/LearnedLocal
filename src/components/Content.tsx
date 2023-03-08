import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";

const Content = () => {
  const { data: experiences, isLoading } = api.experience.getAll.useQuery();
  const createExperience = api.experience.create.useMutation();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [maxAttendees, setMaxAttendees] = useState<number>(0);
  const [requirements, setRequirements] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [recurring, setRecurring] = useState<boolean>(false);
  const [categories, setCategories] = useState<string>("");

  return (
    <div>
      <h1>Create an Experience</h1>
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
          // recurring: false, // added for our checkbox
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
            price: 8.88,
          });

          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <FormLabel text="Experience Title" />
            <InputField
              id="title"
              type="text"
              placeholder="experience title"
              value={values.title}
              onChange={handleChange}
            />
            <FormLabel text="Experience Description" />
            <InputField
              id="description"
              type="text"
              placeholder="experience description"
              value={values.description}
              onChange={handleChange}
            />
            <FormLabel text="Experience Location" />
            <InputField
              id="location"
              type="text"
              placeholder="experience location"
              value={values.location}
              onChange={handleChange}
            />
            {/* <FormLabel text="Experience Price"/>
          <InputField id="description" type="number" placeholder="experience description"/> */}

            {/* <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox> */}

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>

      {/* Max Attendees */}
      <input
        type="number"
        placeholder="Max Attendees Limit"
        className="input-bordered input input-sm w-full"
        value={maxAttendees}
        onChange={(e) => setMaxAttendees(parseInt(e.target.value))}
      />
      {/* Photos */}
      {/* Requirements */}
      <input
        type="text"
        placeholder="Requirements"
        className="input-bordered input input-sm w-full"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
      />
      {/* Video */}
      {/* Dates */}
      <input
        type="text"
        placeholder="Date"
        className="input-bordered input input-sm w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {/* Time */}
      <input
        type="text"
        placeholder="Time"
        className="input-bordered input input-sm w-full"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      {/* Reccuring? */}
      {/* Categories */}
      <input
        type="Category"
        placeholder="Category"
        className="input-bordered input input-sm w-full"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />
      {/* Tags? (for searching) */}
      {/* Rules? */}
    </div>
  );
};

export default Content;

type InputFieldProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
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

const InputField = ({
  id,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => (
  <>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
      value={value}
      onChange={onChange}
    />
  </>
);

type FormLabelProps = {
  text: string;
};

const FormLabel = ({ text }: FormLabelProps) => (
  <>
    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
      {text}
    </label>
  </>
);
