import { Formik, Form, Field, useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import DescriptionPage from "./DescriptionPage";
import TimePage from "./TimePage";
import LocationPage from "./LocationPage";
import SubmitPage from "./FinalStepsPage";
import { FormValues, TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs";
import { useMemo, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import CreateExperienceFormArea from "./CreateExperienceFormArea";

const validationSchema = Yup.object({
  // firstName: Yup.string().required('First name is required'),
  // lastName: Yup.string().required('Last name is required'),
  // email: Yup.string().email('Invalid email address').required('Email is required'),
  // password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  // confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  // address: Yup.string().required('Address is required'),
  // city: Yup.string().required('City is required'),
  // state: Yup.string().required('State is required'),
  // zip: Yup.string().required('Zip code is required'),
});

const initialValues: FormValues = {
  title: "",
  theme: "",
  description: "",
  timeline: "",
  duration: "",
  date: "",
  time: "",
  location: "",
  locationDescription: "",
  firstName: "",
  lastName: "",
  profilePic: "",
  qualifications: "",
  provided: "",
  guestRequirements: "",
  minAge: 0,
  price: 0,
  activityLevel: "",
  skillLevel: "",
  photos: [],
  maxAttendees: 0,
};

const CreateExperienceForm = () => {
  const router = useRouter();

  const params = Array.isArray(router.query.slug)
    ? (router.query.slug as string[])
    : [];

  const [slug, currentTab = ""] = params;
  const tabInfoList: TabInfo[] = [
    {
      url: `/experience/create/${slug}`,
      text: "Description",
      activeMatcher: "",
    },
    {
      url: `/experience/create/${slug}/time`,
      text: "Time",
      activeMatcher: "time",
    },
    {
      url: `/experience/create/${slug}/location`,
      text: "Location",
      activeMatcher: "location",
    },
    {
      url: `/experience/create/${slug}/submit`,
      text: "Submit",
      activeMatcher: "submit",
    },
  ];

  const TabComponent = useMemo(() => {
    switch (currentTab) {
      case "time":
        return <TimePage />;
      case "location":
        return <LocationPage />;
      case "submit":
        return <SubmitPage />;
      default:
        return <DescriptionPage />;
    }
  }, [currentTab]);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(true);
    console.log("onSubmit", values);

    setTimeout(() => {
      helpers.setSubmitting(false);
      helpers.resetForm({ values });
    }, 2000);

    router.push("/success");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => handleSubmit(values, helpers)}
    >
      <ProSidebarProvider>
        <Form>
          <div className="grid grid-cols-2">
            <CreateExperienceTabs tabInfoList={tabInfoList} />
            <CreateExperienceFormArea tabComponent={TabComponent} />
          </div>
        </Form>
      </ProSidebarProvider>
    </Formik>
  );
};

export default CreateExperienceForm;
