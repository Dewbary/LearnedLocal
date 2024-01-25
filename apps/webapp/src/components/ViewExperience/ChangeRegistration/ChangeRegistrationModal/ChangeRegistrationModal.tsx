import { useState } from "react"
import UpdateRegistrationPage from "./UpdateRegistrationPage"
import { Typography } from "~/components/common/Typography";
import { useRouter } from "next/router";
import { ExperienceInfo, RegistrationInfo } from "packages/db/types/types";
import { Registration } from "packages/db";
import { api } from "~/utils/api";

type Props = {
  experience: ExperienceInfo;
  activeRegistration: RegistrationInfo;
  registrations: Registration[];
}

export default function ChangeRegistrationModal({ experience, activeRegistration, registrations } : Props) {

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedAvailability, setSelectedAvailability] = useState(activeRegistration.availability);
  const router = useRouter();
  const registrationUpdater = api.registration.changeRegistrationAvailability.useMutation();
  const registrationDeleter = api.registration.removeRegistrant.useMutation();

  const pages = [
    {
      pageId: "intro",
      buttons: [
        "Change my date",
        "Cancel reservation"        
      ],
      title: "Change reservation",
      description: "Feel free to change your reservation date to better fit your schedule's needs, or if necessary cancel your reservation.",
      primaryButtonDestination: "change",
      secondaryButtonDestination: "cancel"
    },
    {
      pageId: "cancel",
      buttons: [
        "Yes",
        "No"
      ],
      title: "Cancel confirmation",
      description: "Are you sure you want to cancel your reservation?",
      primaryButtonAction: async () => {
        await registrationDeleter.mutateAsync(activeRegistration.id);
        return true;
      },
      primaryButtonDestination: "cancel_success",
      secondaryButtonDestination: "intro"
    },
    {
      pageId: "cancel_success",
      buttons: [
        "Explore experiences"
      ],
      title: "Reservation canceled",
      description: "Your reservation has been successfully canceled. Please contact Learned Local to receive a refund, and let us know what we can improve for your next experience.",
      primaryButtonAction: async () => { 
        await router.push("/home");
        return true;
      },
      primaryButtonDestination: "exit"
    },
    {
      pageId: "change",
      buttons: [
        "Update",
        "Back"
      ],
      title: "Change reservation",
      description: "Update your reservation as needed.",
      primaryButtonAction: async () => { 
        const result = await registrationUpdater.mutateAsync({
          registrationId: activeRegistration.id,
          newAvailabilityId: selectedAvailability.id
        });
        return result === "success";
      },
      primaryButtonDestination: "change_success",
      secondaryButtonDestination: "intro",
      pageContents: 
        <UpdateRegistrationPage
          experience={experience}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          activeRegistration={activeRegistration}
          registrations={registrations}
        />
    },
    {
      pageId: "change_success",
      buttons: [
        "View my experiences"
      ],
      title: "Reservation updated",
      description: "Your reservation has been successfully updated! You will receive an email shortly with your new reservation confirmation.",
      primaryButtonAction: async () => { 
        await router.push("/myexperiences");
        return true;
      },
      primaryButtonDestination: "exit",
    },
    {
      pageId: "error",
      buttons: [
        "Refresh this page"
      ],
      title: "Error updating reservation",
      description: "There was an error in updating your reservation. This might have been because you tried to change to a date that didn't have room for your group. If not, please try again.",
      primaryButtonAction: () => { 
        router.reload();
        return true;
      },
      primaryButtonDestination: "exit"
    }
  ]

  const handlePrimaryButtonClick = async () => {
    const currentPage = pages[currentPageIndex];
    if (!currentPage) return;
    if (currentPage?.primaryButtonAction) {
      const actionSuccess = await currentPage.primaryButtonAction();
      if (!actionSuccess) {
        setPage("error");
        return;
      }
    }
    setPage(currentPage?.primaryButtonDestination);
  }

  const handleSecondaryButtonClick = () => {
    const currentPage = pages[currentPageIndex];
    if (!currentPage || !currentPage.secondaryButtonDestination) return;
    setPage(currentPage.secondaryButtonDestination);
  }

  const setPage = (pageId: string) => {
    const indexSearch = pages.findIndex(page => page.pageId === pageId);
    if (indexSearch === -1) return;
    setCurrentPageIndex(pages.findIndex(page => page.pageId === pageId));
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col w-full items-center p-5 pt-10 gap-4 max-w-md lg:p-10">
          <h1 className={Typography.ModalTitle}>{pages[currentPageIndex]?.title}</h1>
          <h2 className={Typography.InfoText}>{pages[currentPageIndex]?.description}</h2>
          {pages[currentPageIndex]?.pageContents}
          <div className="flex flex-row gap-3 w-full">
            {(pages[currentPageIndex]?.buttons.length || 0) > 1 && (
              <button 
                className="py-4 border border-ll-orange font-inter text-sm rounded-full text-ll-orange basis-1/2 hover:opacity-70"
                onClick={() => handleSecondaryButtonClick()}
                data-cy="change-reservation-button-secondary"
              >
                {pages[currentPageIndex]?.buttons[1]}
              </button>
            )}
            <button 
              className="py-4 border border-ll-orange font-inter text-sm rounded-full text-ll-grey bg-ll-orange basis-1/2 flex-grow hover:opacity-70"
              onClick={() => handlePrimaryButtonClick()}
              data-cy="change-reservation-button-primary"
            >
              {pages[currentPageIndex]?.buttons[0]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}