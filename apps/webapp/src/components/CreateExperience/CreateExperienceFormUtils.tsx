import * as Yup from "yup";
import type { FormValues } from "./types";
import RequirementsPage from "./RequirementsPage/RequirementsPage";
import PhotosPage from "./PhotosPage/PhotosPage";
import StartPage from "./StartPage";
import type { ImageListType } from "react-images-uploading";
import { uploadImageToBucket } from "~/utils/images";
import type { ExperienceInfo, Pin } from "@learnedlocal/db/types/types";
import { FormPage } from "../types";
import General from "./FormPages/General";
import DateTime from "./FormPages/DateTime";
import Location from "./FormPages/Location";
import Requirements from "./FormPages/Requirements";
import Photos from "./FormPages/Photos";

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

export const SKILL_LEVELS = [
  { value: "Beginner", name: "Beginner" },
  { value: "Intermediate", name: "Intermediate" },
  { value: "Advanced", name: "Advanced" },
  { value: "Expert", name: "Expert" },
];

export const ACTIVITY_LEVELS = [
  { value: "Low", name: "Low" },
  { value: "Medium", name: "Medium" },
  { value: "High", name: "High" },
  { value: "Extreme", name: "Extreme" },
];

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

export const formPages: FormPage[] = [
  {
    url: "general",
    tabTitle: "General",
    pageTitle: "Event overview",
    subTitle:
      "Provide general event information here. Your attendees will see the title and description first, so make sure they give a good first impression",
    pageComponent: <General />,
  },
  {
    url: "date",
    tabTitle: "Date/Time",
    pageTitle: "Select dates & times",
    subTitle:
      "For a reoccurring experience, choose several dates and times for hosting your event, or opt for a single date and time.",
    pageComponent: <DateTime />,
  },
  {
    url: "location",
    tabTitle: "Location",
    pageTitle: "Select event location",
    subTitle:
      "This address is only shared with guests ater they have signed up.",
    pageComponent: <Location />,
  },
  {
    url: "requirements",
    tabTitle: "Guest Requirements",
    pageTitle: "Set guest requirements",
    subTitle: "Set guest requirements and help attendees know how to prepare",
    pageComponent: <Requirements />,
  },
  {
    url: "photos",
    tabTitle: "Photos",
    pageTitle: "Add photos",
    subTitle:
      "Help your attendees know what to expect by adding some photos of the experience. Aim for high-quality photos to wow your audience.",
    pageComponent: <Photos />,
  },
];

export const getCurrentFormPage = (
  activeTab: string,
  isEditing: boolean
): FormPage => {
  const formPage = formPages.find(
    (page) => page.url.toLowerCase() === activeTab.toLowerCase()
  );

  if (!formPage) {
    return {
      url: "start",
      tabTitle: "Start",
      pageTitle: "Start",
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
  hostProfileId: string,
  isDraft: boolean
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
    draft: isDraft,
  };
};

export const getCreateExperienceObject = (
  values: FormValues,
  filePathArray: string[],
  slug: string,
  hostProfileId: string,
  isDraft: boolean
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
    draft: isDraft,
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
