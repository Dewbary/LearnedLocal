import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import DescriptionPage from "./DescriptionPage";
import TimePage from "./TimePage";
import LocationPage from "./LocationPage";
import AboutPage from "./AboutPage";
import RequirementsPage from "./RequirementsPage";
import SettingsPage from "./SettingsPage";
import SubmitPage from "./SubmitPage";
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
  ];

  const TabComponent = useMemo(() => {
    switch (currentTab) {
      case "time":
        return <TimePage />;
      case "location":
        return <LocationPage />;
      default:
        return <DescriptionPage />;
    }
  }, [currentTab]);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    router.push("/success");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <ProSidebarProvider>
        <div className="grid grid-cols-2">
          <CreateExperienceTabs
            open={showSidebar}
            setOpen={setShowSidebar}
            tabInfoList={tabInfoList}
          />
          <CreateExperienceFormArea tabComponent={TabComponent} />
        </div>
      </ProSidebarProvider>
    </Formik>
  );

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: handleSubmit,
  // });

  // switch (router.pathname) {
  //   case "/create/description":
  //     return <DescriptionPage formik={formik} />;
  //   case "/create/time":
  //     return <TimePage formik={formik} />;
  //   case "/create/location":
  //     return <LocationPage formik={formik} />;
  //   case "/create/about":
  //     return <AboutPage formik={formik} />;
  //   case "/create/requirements":
  //     return <RequirementsPage formik={formik} />;
  //   case "/create/settings":
  //     return <SettingsPage formik={formik} />;
  //   case "/create/submit":
  //     return <SubmitPage formik={formik} />;
  //   default:
  //     return <DescriptionPage formik={formik} />;
  // }
};

export default CreateExperienceForm;
