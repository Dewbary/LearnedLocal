import { FormikProps } from "formik";
import { Pin } from "./LocationPicker/LocationPicker";
import { ImageListType } from "react-images-uploading";

import { DateInfo } from "../types";

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
  activityLevel: string;
  skillLevel: string;
  photos: ImageListType;
  maxAttendees: number;
  categoryId: number;
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
