import { FormikProps } from "formik";

export type FormValues = {
  title: string;
  theme: string;
  description: string;
  timeline: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
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
};
