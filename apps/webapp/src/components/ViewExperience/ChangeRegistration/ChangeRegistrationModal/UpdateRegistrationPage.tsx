import type { ExperienceInfo } from "packages/db/types/types";
import ExperienceDateTimeSelect from "../../EventSignUp/ExperienceDateTimeSelect";
import type { ExperienceAvailability, Registration } from "packages/db";
import GuestCounter from "../../Components/GuestCounter";
import PriceDisplay from "../../Components/PriceDisplay";

type Props = {
  experience: ExperienceInfo;
  selectedAvailability: ExperienceAvailability;
  setSelectedAvailability: (availability: ExperienceAvailability) => void;
  activeRegistration: Registration;
  registrations: Registration[];
}

export default function UpdateRegistrationPage({ experience, selectedAvailability, setSelectedAvailability, activeRegistration, registrations } : Props) {
  return (
    <>
      <div className="flex flex-col w-full">
        <ExperienceDateTimeSelect
          experience={experience}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          registrationsCount={registrations}
        />

        <GuestCounter
          registreeCount={activeRegistration.partySize}
        />

        <PriceDisplay
          isFree={experience.free}
          pricePerParticipant={experience.price}
          participantCount={activeRegistration.partySize}
        />
      </div>
    </>
  )
}