import { Formik, Form, Field, useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  HomeIcon,
  CalendarIcon,
  ClockIcon,
  CogIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import DescriptionPage from "./DescriptionPage";
import TimePage from "./TimePage";
import LocationPage from "./LocationPage";
import FinalStepsPage from "./FinalStepsPage";
import { FormValues, TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs/CreateExperienceTabs";
import { ProSidebarProvider } from "react-pro-sidebar";
import CreateExperienceFormArea from "./CreateExperienceFormArea";
import AboutPage from "./AboutPage";
import RequirementsPage from "./RequirementsPage";
import SettingsPage from "./SettingsPage";
import PhotosPage from "./PhotosPage";
import DatePage from "./DatePage";
import { api } from "~/utils/api";

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
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  locationDescription: "",
  firstName: "",
  lastName: "",
  profilePic: "",
  qualifications: "",
  provided: "",
  guestRequirements: "",
  activityLevel: "",
  skillLevel: "",
  minAge: 0,
  price: 0,
  maxAttendees: 0,
  photos: [],
};

const CreateExperienceForm = () => {
  const router = useRouter();
  const createExperience = api.experience.create.useMutation();

  const params = Array.isArray(router.query.slug)
    ? (router.query.slug as string[])
    : [];

  const [slug, currentTab = ""] = params;
  const tabInfoList: TabInfo[] = [
    {
      url: `/experience/create/${slug}`,
      text: "Description",
      activeMatcher: "experience/create",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/date`,
      text: "Date",
      activeMatcher: "date",
      icon: <CalendarIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/time`,
      text: "Time",
      activeMatcher: "time",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/location`,
      text: "Location",
      activeMatcher: "location",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/requirements`,
      text: "Requirements",
      activeMatcher: "requirements",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/settings`,
      text: "Settings",
      activeMatcher: "settings",
      icon: <CogIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/photos`,
      text: "Photos",
      activeMatcher: "photos",
      icon: <CameraIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/submit`,
      text: "Submit",
      activeMatcher: "submit",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
  ];

  const getTabComponent = (tab: string) => {
    switch (tab) {
      case "date":
        return <DatePage />;
      case "time":
        return <TimePage />;
      case "location":
        return <LocationPage />;
      case "about":
        return <AboutPage />;
      case "requirements":
        return <RequirementsPage />;
      case "settings":
        return <SettingsPage />;
      case "photos":
        return <PhotosPage />;
      case "submit":
        return <FinalStepsPage />;
      default:
        return <DescriptionPage />;
    }
  };

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(true);
    console.log("onSubmit", values);

    createExperience.mutate({
      title: values.title,
      content: values.description,
      price: values.price,
    });

    setTimeout(() => {
      helpers.setSubmitting(false);
      helpers.resetForm({ values });
    }, 2000);

    router.push("/success");
  };

  return (
    <div className="flex h-screen flex-col">
      <nav className="flex h-32 items-center bg-white px-8">
        <div>
          <h1 className="text-2xl font-bold">Create Your Experience</h1>
          <p className="text-sm text-gray-600">
            Follow the steps below to create your experience
          </p>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 overflow-y-auto sm:block">
          <CreateExperienceTabs
            tabInfoList={tabInfoList}
            currentTab={currentTab}
          />
        </aside>

        <main className="paragraph ml-8 mr-12 mb-12 flex flex-1 overflow-y-auto rounded-lg bg-gray-100 px-8 py-8">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, helpers) => handleSubmit(values, helpers)}
          >
            <Form className="w-full">
              <CreateExperienceFormArea
                tabComponent={getTabComponent(currentTab)}
              />
            </Form>
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default CreateExperienceForm;
