import * as React from "react";
import { Typography } from "~/components/common/Typography";
import ExperienceDateTimeSelect from "./ExperienceDateTimeSelect";
import type { ExperienceInfo } from "packages/db/types/types";
import type { ExperienceAvailability, Registration } from "packages/db";
import GuestCounter from "../Components/GuestCounter";
import PriceDisplay from "../Components/PriceDisplay";

type Props = {
  experience: ExperienceInfo;
  registrantCount: Registration[] | undefined;
  goToCheckoutPage: (availabilityId: number | null, partySize: number) => void;
};

const EventSignUp = ({
  experience,
  registrantCount,
  goToCheckoutPage
}: Props) => {

  const [registreeCount, setRegistreeCount] = React.useState<number>(1);
  const [selectedAvailability, setSelectedAvailability] = React.useState<
    ExperienceAvailability | undefined
  >(experience.availability[0]);

  React.useEffect(() => {
    setSelectedAvailability(experience.availability[0]);
  }, [experience]);

  return (
    <div className="w-[328px] rounded-2xl border border-ll-slate p-6">
      <div className={Typography.SecondaryTitle}>Event details</div>

      <ExperienceDateTimeSelect
        experience={experience}
        selectedAvailability={selectedAvailability}
        setSelectedAvailability={setSelectedAvailability}
        registrationsCount={registrantCount}
      />

      <GuestCounter
        registreeCount={registreeCount} 
        setRegistreeCount={setRegistreeCount}        
      />

      <PriceDisplay
        isFree={experience.free}
        pricePerParticipant={experience.price}
        participantCount={registreeCount}
      />

      <button
        className="mt-4 flex w-full items-center justify-center rounded-full bg-ll-orange px-6 py-4 text-white"
        onClick={() =>
          goToCheckoutPage(selectedAvailability?.id ?? null, registreeCount)
        }
      >
        <div className={Typography.ButtonText}>Sign up</div>
      </button>
    </div>
  );
};

export default EventSignUp;
