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
  experienceId: string | null,
  slug: string,
  setIsCreating: (isCreating: boolean) => void,
  hostProfileId: string | null | undefined
) => {
  const user = useUser();
  const router = useRouter();
  const createExperience = api.experience.create.useMutation();
  const updateExperience = api.experience.update.useMutation();
  const replaceAvailabilities =
    api.availability.updateAvailabilities.useMutation();

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    if (!user || !user.isSignedIn) return;
    setIsCreating(true);
    helpers.setSubmitting(true);

    try {
      const filePathArray: string[] = [];
      await uploadImages(filePathArray, values.photos, user.user.id);

      if (experienceId && hostProfileId) {
        const updatedExperience = getUpdateExperienceObject(
          values,
          experienceId,
          filePathArray,
          slug,
          hostProfileId
        );

        await replaceAvailabilities.mutateAsync({
          experienceId: updatedExperience.id,
          availabilities: updatedExperience.availability,
        });

        await updateExperience.mutateAsync(updatedExperience);
      } else if (hostProfileId) {
        const newExperience = await createExperience.mutateAsync(
          getCreateExperienceObject(values, filePathArray, slug, hostProfileId)
        );
      } else {
        throw "No profile has been created";
      }

      await router.push("/experience/success");
    } catch (error) {
      console.log(error);
      await router.push("/experience/failure");
    } finally {
      helpers.setSubmitting(false);
      setIsCreating(false);
    }
  };

  return handleSubmit;
};
