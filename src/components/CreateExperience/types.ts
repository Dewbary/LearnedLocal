import { FormikProps } from "formik";
import { Pin } from "./LocationPicker/LocationPicker";
import { ImageListType } from "react-images-uploading";

export type FormValues = {
  title: string;
  description: string;
  timeline: string;
  date: string;
  startTime: string;
  endTime: string;
  location: Pin;
  locationDescription: string;
  firstName: string;
  lastName: string;
  email: string;
  qualifications: string;
  provided: string;
  guestRequirements: string;
  minAge: number;
  price: number;
  activityLevel: string;
  skillLevel: string;
  profileImage: string | null;
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
