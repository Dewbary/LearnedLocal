import { Formik, Form, Field, useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  HomeIcon,
  CalendarIcon,
  ClockIcon,
  CogIcon,
  CameraIcon,
  CheckCircleIcon,
  UserIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
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
import { useStepNavigation } from "./hooks/useStepNavigation";
import StartPage from "./StartPage";
import { Pin } from "./LocationPicker/LocationPicker";
import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";

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
  theme: 0,
  description: "",
  timeline: "",
  date: "",
  startTime: "",
  endTime: "",
  location: { lat: 0, lng: 0 },
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

  const [slug] = params;
  const [location, setLocation] = useState<Pin | null>(null);
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  const handleLocationChange = (newLocation: Pin) => {
    setLocation(newLocation);
  };

  const tabInfoList: TabInfo[] = [
    {
      url: `/experience/create/${slug}/description`,
      text: "Description",
      activeMatcher: "description",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/about`,
      text: "About",
      activeMatcher: "about",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/date`,
      text: "Date & Time",
      activeMatcher: "date",
      icon: <CalendarIcon className="h-5 w-5" />,
    },
    // {
    //   url: `/experience/create/${slug}/time`,
    //   text: "Time",
    //   activeMatcher: "time",
    //   icon: <ClockIcon className="h-5 w-5" />,
    // },
    {
      url: `/experience/create/${slug}/location`,
      text: "Location",
      activeMatcher: "location",
      icon: <MapPinIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/requirements`,
      text: "Requirements",
      activeMatcher: "requirements",
      icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
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

  const { next, back, goToStep, activeTab, step } = useStepNavigation(
    tabInfoList,
    0
  );

  const getTabComponent = () => {
    switch (activeTab?.activeMatcher) {
      case "description":
        return <DescriptionPage />;
      case "date":
        return (
          <DatePage
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedMonth={currentMonth}
            setSelectedMonth={setCurrentMonth}
          />
        );
      // case "time":
      //   return <TimePage />;
      case "location":
        return (
          <LocationPage
            location={location}
            onLocationChange={handleLocationChange}
          />
        );
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
        return <StartPage />;
    }
  };

  const handleSubmit = (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(true);
    console.log("onSubmit", values);
    const date = new Date(values.date);

    createExperience.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      description: values.description,
      price: values.price,
      theme: values.theme,
      date: date,
      startTime: values.startTime,
      endTime: values.endTime,
      timeline: values.timeline,
      location: values.location,
      locationDescription: values.locationDescription,
      qualifications: values.qualifications,
      provided: values.provided,
      guestRequirements: values.guestRequirements,
      minAge: values.minAge,
      activityLevel: values.activityLevel,
      skillLevel: values.skillLevel,
      maxAttendees: values.maxAttendees,
    });

    setTimeout(() => {
      helpers.setSubmitting(false);
      // helpers.resetForm({ values });
    }, 2000);

    // router.push("/success");
  };

  const handleTabClick = (index: number) => {
    goToStep(index);
    router.push(tabInfoList[index]?.url || "", undefined, { shallow: true });
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
        <aside className="flex w-64 flex-col overflow-y-auto">
          <CreateExperienceTabs
            tabInfoList={tabInfoList}
            currentTab={activeTab?.activeMatcher}
            onTabClick={handleTabClick}
          />
        </aside>

        <main className="paragraph ml-8 mr-12 mb-12 flex flex-1 overflow-y-auto rounded-lg bg-gradient-to-r from-amber-400 via-amber-200 to-slate-50 px-8 py-8">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, helpers) => handleSubmit(values, helpers)}
          >
            <Form className="w-full">
              <CreateExperienceFormArea
                tabComponent={getTabComponent()}
                onNext={next}
                onBack={back}
                isFirstStep={step === 0}
                isLastStep={step === tabInfoList.length - 1}
              />
            </Form>
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default CreateExperienceForm;
