import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import {
  getUpdateExperienceObject,
  getCreateExperienceObject,
  uploadImages,
} from "../CreateExperienceFormUtils";
import type { FormValues } from "../types";

export const useExperienceSubmission = (
  experienceId: string,
  slug: string,
  setIsCreating: (isCreating: boolean) => void,
  hostProfileId: string | null | undefined,
) => {
  const user = useUser();
  const router = useRouter();
  const createExperience = api.experience.create.useMutation();
  const updateExperience = api.experience.update.useMutation();

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    if (!user || !user.isSignedIn) return;
    setIsCreating(true);
    helpers.setSubmitting(true);

    try {
      const date = new Date(values.date);
      const filePathArray: string[] = [];
      await uploadImages(filePathArray, values.photos, user.user.id);

      if (experienceId && hostProfileId) {
        await updateExperience.mutateAsync(
          getUpdateExperienceObject(
            values,
            experienceId,
            date,
            filePathArray,
            slug,
            hostProfileId
          )
        );
      } else if (hostProfileId) {
        await createExperience.mutateAsync(
          getCreateExperienceObject(values, date, filePathArray, slug, hostProfileId)
        );
      } else {
        throw "No profile has been created"
      }

      await router.push("/experience/success");
    } catch (error) {
      await router.push("/experience/failure");
    } finally {
      helpers.setSubmitting(false);
      setIsCreating(false);
    }
  };

  return handleSubmit;
};
