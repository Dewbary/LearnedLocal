import * as Yup from "yup";
import type { FormValues } from "./types";
import {
  HomeIcon,
  CalendarIcon,
  CogIcon,
  CameraIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import DatePage from "./DatePage/DatePage";
import LocationPage from "./LocationPage/LocationPage";
import RequirementsPage from "./RequirementsPage/RequirementsPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import PhotosPage from "./PhotosPage/PhotosPage";
import FinalStepsPage from "./FinalStepsPage/FinalStepsPage";
import StartPage from "./StartPage";
import type { ImageListType } from "react-images-uploading";
import { uploadImageToBucket } from "~/utils/images";
import type { ExperienceInfo, Pin } from "@learnedlocal/db/types/types";
import { FormPage } from "../types";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("You need to give your experience a title"),
  description: Yup.string().required(
    "You need to give your experience a description"
  ),
  availability: Yup.array()
    .of(
      Yup.object().shape({
        startTime: Yup.string().required(
          "You must set a start time for your experience"
        ),
        endTime: Yup.string()
          .nullable()
          .required("You must set an end time for your experience"),
      })
    )
    .required("You must have at least one date and time for your experience")
    .min(1, "You must have at least one date and time for your experience"),
  free: Yup.boolean(),
  price: Yup.number().when("free", {
    is: (free: boolean) => !free,
    then: (schema: Yup.NumberSchema) =>
      schema
        .min(1, "If your experience is not free, it must be at least $1")
        .required("If your experience is not free, it must be at least $1"),
  }),
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
  skillLevel: "Beginner",
  minAge: 0,
  price: 1,
  free: false,
  maxAttendees: 1,
  photos: [],
  categoryId: 0,
  prepItems: [],
  includedItems: [],
  activityNotes: [],
  additionalInformation: "",
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

const formPages: FormPage[] = [
  {
    title: "Description",
    subTitle: "Tell us about your experience",
    pageComponent: <DescriptionPage />,
  },
  {
    title: "Date & Time",
    subTitle: "When is your experience?",
    pageComponent: <DatePage />,
  },
  {
    title: "Location",
    subTitle: "Where is your experience?",
    pageComponent: <LocationPage />,
  },
  {
    title: "Requirements",
    subTitle: "What do guests need to know?",
    pageComponent: <RequirementsPage />,
  },
  {
    title: "Settings",
    subTitle: "How do you want to run your experience?",
    pageComponent: <SettingsPage />,
  },
  {
    title: "Photos",
    subTitle: "Show off your experience",
    pageComponent: <PhotosPage />,
  },
  {
    title: "Submit",
    subTitle: "Review your experience",
    pageComponent: <FinalStepsPage isEditing={false} />,
  },
];

export const getCurrentFormPage = (
  activeTab: string,
  isEditing: boolean
): FormPage => {
  const formPage = formPages.find(
    (page) => page.title.toLowerCase() === activeTab.toLowerCase()
  );

  if (!formPage) {
    return {
      title: "Start",
      subTitle: "Let's get started",
      pageComponent: <StartPage />,
    };
  }

  return formPage;
};

export const uploadImages = async (
  filePathArray: string[],
  imgList: ImageListType,
  userId: string
) => {
  await Promise.all(
    imgList.map(async (img, index) => {
      if (!img.file) {
        if (img.dataURL) {
          filePathArray[index] = img.dataURL;
        }
        return;
      }
      const path = await uploadImageToBucket(img.file, userId);
      const filePath =
        (process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_URL ?? "") +
        (process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_BUCKET_NAME ?? "") +
        "/" +
        path;
      filePathArray[index] = filePath;
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
    price: values.free ? 1.0 : values.price,
    free: values.free,
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
    availability: values.availability,
    prepItems: values.prepItems,
    includedItems: values.includedItems,
    activityNotes: values.activityNotes,
    additionalInformation: values.additionalInformation,
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
    price: values.free ? 1.0 : values.price,
    free: values.free,
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
    availability: values.availability,
    prepItems: values.prepItems,
    includedItems: values.includedItems,
    activityNotes: values.activityNotes,
    additionalInformation: values.additionalInformation,
  };
};

export const getInitialFormValues = (
  experience: ExperienceInfo | undefined | null
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
