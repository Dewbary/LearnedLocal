import {
  Formik,
  Form,
  FormikHelpers,
  useFormikContext,
  FormikContextType,
} from "formik";
import { useRouter } from "next/router";
import DescriptionPage from "./DescriptionPage/DescriptionPage";
import LocationPage from "./LocationPage";
import FinalStepsPage from "./FinalStepsPage";
import { FormValues, TabInfo } from "./types";
import CreateExperienceTabs from "./CreateExperienceTabs/CreateExperienceTabs";
import CreateExperienceFormArea from "./CreateExperienceFormArea";
import AboutPage from "./AboutPage";
import RequirementsPage from "./RequirementsPage";
import SettingsPage from "./SettingsPage";
import PhotosPage from "./PhotosPage";
import DatePage from "./DatePage";
import { useStepNavigation } from "./hooks/useStepNavigation";
import StartPage from "./StartPage";
import { Pin } from "./LocationPicker/LocationPicker";
import { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import { api } from "~/utils/api";
import { uploadImageToBucket } from "~/utils/images";
import { useUser } from "@clerk/nextjs";
import { getTabInfos, initialValues } from "./CreateExperienceFormUtils";
import CreateExperienceHeader from "./Layout/CreateExperienceHeader";
import { ImageListType } from "react-images-uploading";
import { Experience } from "@prisma/client";

const CreateExperienceForm = () => {
  const { user } = useUser();

  // Router
  const router = useRouter();
  const params = Array.isArray(router.query.slug)
    ? (router.query.slug as string[])
    : [];
  const [slug] = params;
  const { experienceId: experienceIdStr } = router.query;
  const experienceId = parseInt(experienceIdStr as string);

  // TRPC
  const createExperience = api.experience.create.useMutation();
  const { data: experience, isLoading } =
    api.experience.byExperienceId.useQuery(experienceId, {
      enabled: !!experienceId,
    });

  // State
  const today = startOfToday();
  const [location, setLocation] = useState<Pin | null>(null);
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [images, setImages] = useState<ImageListType>([]);
  const [initialFormValues, setInitialFormValues] =
    useState<FormValues>(initialValues);

  const tabInfoList: TabInfo[] = getTabInfos(slug ?? "");
  const { next, back, goToStep, activeTab, step } = useStepNavigation(
    tabInfoList,
    0
  );

  useEffect(() => {
    if (experience) {
      console.log("experience", experience);
      // update the initialValues with the experience data
      const pin = experience.location as Pin;
      setInitialFormValues({
        ...experience,
        date: experience.date.toISOString(),
        location: pin,
      });
    }
  }, [experience]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const handleLocationChange = (newLocation: Pin) => {
    setLocation(newLocation);
  };

  const getTabComponent = () => {
    switch (activeTab?.activeMatcher) {
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
        return (
          <LocationPage
            location={location}
            onLocationChange={handleLocationChange}
          />
        );
      case "about":
        return <AboutPage />;
      case "requirements":
        return <RequirementsPage />;
      case "settings":
        return <SettingsPage />;
      case "photos":
        return <PhotosPage images={images} onSetImages={setImages} />;
      case "submit":
        return <FinalStepsPage />;
      default:
        return <StartPage />;
    }
  };

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    if (!user) return;
    helpers.setSubmitting(true);
    console.log("onSubmit", values);

    const date = new Date(values.date);

    const filePathArray: string[] = [];

    await Promise.all(
      images.map(async (img) => {
        if (!img.file) return;
        const path = await uploadImageToBucket(img.file, user.id);
        const filePath =
          "https://sipawyumxienbevdvlse.supabase.co/storage/v1/object/public/images/" +
          path;
        filePathArray.push(filePath);
      })
    );

    createExperience.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      title: values.title,
      description: values.description,
      price: values.price,
      date: date,
      startTime: values.startTime,
      endTime: values.endTime,
      timeline: values.timeline,
      location: values.location,
      locationDescription: values.locationDescription,
      qualifications: values.qualifications,
      provided: values.provided,
      guestRequirements: values.guestRequirements,
      minAge: values.minAge,
      activityLevel: values.activityLevel,
      skillLevel: values.skillLevel,
      maxAttendees: values.maxAttendees,
      profileImage: values.profileImage,
      photos: filePathArray,
      slugId: slug ?? "",
      categoryId: values.categoryId,
    });

    setTimeout(() => {
      helpers.setSubmitting(false);
      // helpers.resetForm({ values });
    }, 2000);

    // router.push("/success");
  };

  const handleTabClick = (index: number) => {
    goToStep(index);
    router.push(tabInfoList[index]?.url || "", undefined, { shallow: true });
  };

  return (
    <div className="flex h-screen flex-col">
      <CreateExperienceHeader />

      <div className="flex flex-1 overflow-hidden">
        <CreateExperienceTabs
          tabInfoList={tabInfoList}
          currentTab={activeTab?.activeMatcher}
          onTabClick={handleTabClick}
        />

        <main className="paragraph ml-8 mr-12 mb-12 flex flex-1 overflow-y-auto rounded-lg bg-gradient-to-r from-amber-400 via-amber-200 to-slate-50 px-8 py-8">
          <Formik
            initialValues={initialFormValues}
            onSubmit={(values, helpers) => handleSubmit(values, helpers)}
            enableReinitialize
          >
            <Form className="w-full">
              <CreateExperienceFormArea
                tabComponent={getTabComponent()}
                onNext={next}
                onBack={back}
                isFirstStep={step === 0}
                isLastStep={step === tabInfoList.length - 1}
              />
            </Form>
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default CreateExperienceForm;
