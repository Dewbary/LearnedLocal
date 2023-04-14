import { FormikProps } from "formik";
import { Pin } from "./LocationPicker/LocationPicker";

export type FormValues = {
  title: string;
  theme: number;
  description: string;
  timeline: string;
  date: string;
  startTime: string;
  endTime: string;
  location: Pin;
  locationDescription: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  qualifications: string;
  provided: string;
  guestRequirements: string;
  minAge: number;
  price: number;
  activityLevel: string;
  skillLevel: string;
  photos: string[];
  maxAttendees: number;
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
