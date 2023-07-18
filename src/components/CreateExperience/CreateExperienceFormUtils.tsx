import * as Yup from "yup";
import { FormValues, TabInfo } from "./types";
import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  CameraIcon,
  CheckCircleIcon,
  UserIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import DatePage from "./DatePage";
import LocationPage from "./LocationPage";
import RequirementsPage from "./RequirementsPage";
import SettingsPage from "./SettingsPage";
import PhotosPage from "./PhotosPage";
import FinalStepsPage from "./FinalStepsPage";
import StartPage from "./StartPage";
import { ImageListType } from "react-images-uploading";
import { uploadImageToBucket } from "~/utils/images";
import { env } from "~/env.mjs";
import { NextRouter } from "next/router";
import { Experience } from "@prisma/client";
import { Pin } from "./LocationPicker/LocationPicker";
import { format } from "date-fns";

export const validationSchema = Yup.object({
  // firstName: Yup.string().required('First name is required'),
  // lastName: Yup.string().required('Last name is required'),
  // email: Yup.string().email('Invalid email address').required('Email is required'),
  // password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  // confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  // address: Yup.string().required('Address is required'),
  // city: Yup.string().required('City is required'),
  // state: Yup.string().required('State is required'),
  // zip: Yup.string().required('Zip code is required'),
  price: Yup.number().min(0).required("Price is required"),
});

export const initialValues: FormValues = {
  title: "",
  description: "",
  timeline: "",
  availability: [],
  city: "",
  location: { lat: 40.2518, lng: -111.6493 },
  locationDescription: "",
  qualifications: "",
  provided: "",
  guestRequirements: "",
  activityLevel: "",
  skillLevel: "",
  minAge: 0,
  price: 0,
  maxAttendees: 1,
  photos: [],
  categoryId: 0,
};

export const getTabInfos = (slug: string) => {
  if (!slug) return [];

  return [
    {
      url: `/experience/create/${slug}/description`,
      text: "Description",
      activeMatcher: "description",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      url: `/experience/create/${slug}/date`,
      text: "Date & Time",
      activeMatcher: "date",
      icon: <CalendarIcon className="h-5 w-5" />,
    },
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
};

export const getTabComponent = (
  activeTab: string,
  isEditing: boolean,
  selectedDay: Date,
  currentMonth: string,
  setSelectedDay: (day: Date) => void,
  setCurrentMonth: (month: string) => void
) => {
  switch (activeTab) {
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
    case "location":
      return <LocationPage />;
    case "requirements":
      return <RequirementsPage />;
    case "settings":
      return <SettingsPage />;
    case "photos":
      return <PhotosPage />;
    case "submit":
      return <FinalStepsPage isEditing={isEditing} />;
    default:
      return <StartPage />;
  }
};

export const uploadImages = async (
  filePathArray: string[],
  imgList: ImageListType,
  userId: string
) => {
  await Promise.all(
    imgList.map(async (img) => {
      if (!img.file) {
        if (img.dataURL) {
          filePathArray.push(img.dataURL);
        }
        return;
      }
      const path = await uploadImageToBucket(img.file, userId);
      const filePath =
        env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_URL +
        env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME +
        "/" +
        path;
      filePathArray.push(filePath);
    })
  );
};

export const getUpdateExperienceObject = (
  values: FormValues,
  experienceId: string,
  filePathArray: string[],
  slug: string,
  hostProfileId: string
) => {
  // Update the experience
  return {
    id: parseInt(experienceId),
    title: values.title,
    description: values.description,
    price: values.price,
    timeline: values.timeline,
    city: values.city,
    location: values.location,
    locationDescription: values.locationDescription,
    qualifications: values.qualifications,
    provided: values.provided,
    guestRequirements: values.guestRequirements,
    minAge: values.minAge,
    activityLevel: values.activityLevel,
    skillLevel: values.skillLevel,
    maxAttendees: values.maxAttendees,
    photos: filePathArray,
    slugId: slug,
    categoryId: values.categoryId,
    profileId: hostProfileId,
  };
};

export const getCreateExperienceObject = (
  values: FormValues,
  filePathArray: string[],
  slug: string,
  hostProfileId: string
) => {
  return {
    title: values.title,
    description: values.description,
    price: values.price,
    timeline: values.timeline,
    city: values.city,
    location: values.location,
    locationDescription: values.locationDescription,
    qualifications: values.qualifications,
    provided: values.provided,
    guestRequirements: values.guestRequirements,
    minAge: values.minAge,
    activityLevel: values.activityLevel,
    skillLevel: values.skillLevel,
    maxAttendees: values.maxAttendees,
    photos: filePathArray,
    slugId: slug,
    categoryId: values.categoryId,
    profileId: hostProfileId,
  };
};

export const getInitialFormValues = (
  experience: Experience | undefined | null
): FormValues => {
  if (experience) {
    // update the initialValues with the experience data
    const photoData = experience.photos.map((photo) => ({
      dataURL: photo,
    }));

    return {
      ...experience,
      location: experience.location as Pin,
      photos: photoData,
    };
  }

  return initialValues;
};

export const parseQueryString = (
  value: string | string[] | undefined
): string => {
  if (Array.isArray(value)) {
    return value[0] ?? ""; // or however you want to handle multiple values
  } else if (typeof value === "string") {
    return value;
  } else {
    return ""; // or however you want to handle undefined values
  }
};
