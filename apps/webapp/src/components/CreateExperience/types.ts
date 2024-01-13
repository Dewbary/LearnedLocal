import type { FormikErrors, FormikProps } from "formik";
import type { ImageListType } from "react-images-uploading";
import type { DateInfo } from "../types";
import type { Pin } from "@learnedlocal/db/types/types";

export type FormValues = {
  title: string;
  description: string;
  timeline: string;
  availability: DateInfo[];
  city: string | null;
  location: Pin;
  locationDescription: string;
  qualifications: string;
  provided: string;
  guestRequirements: string;
  minAge: number;
  price: number;
  free: boolean;
  activityLevel: string;
  skillLevel: string;
  photos: ImageListType;
  maxAttendees: number;
  categoryId: number;
  prepItems: string[];
  includedItems: string[];
  activityNotes: string[];
  additionalInformation: string;
};

export type FormProps = {
  formik: FormikProps<FormValues>;
};

export type TabInfo = {
  url: string;
  text: string;
  activeMatcher: string;
  icon: React.ReactNode;
};

export type FormError =
  | string
  | string[]
  | FormikErrors<DateInfo>[]
  | undefined;
