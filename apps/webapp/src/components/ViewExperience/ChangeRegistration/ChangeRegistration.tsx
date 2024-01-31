import { Typography } from "~/components/common/Typography";
import DateAndTimeDisplayButton from "../Components/DateAndTimeDisplayButton";
import GuestCounter from "../Components/GuestCounter";
import type { ExperienceInfo, RegistrationInfo } from "packages/db/types/types";
import PriceDisplay from "../Components/PriceDisplay";
import CustomModal from "~/components/common/CustomModal";
import ChangeRegistrationModal from "./ChangeRegistrationModal/ChangeRegistrationModal";
import type { Registration } from "packages/db";

type Props = {
  experience: ExperienceInfo;
  registrationInfo: RegistrationInfo;
  registrations: Registration[];
}

export default function ChangeRegistration({ experience, registrationInfo, registrations } : Props) {
  return (
    <>
      <div className="w-[328px] rounded-2xl border border-ll-slate p-6">
        <div className={Typography.SecondaryTitle}>Your Reservation</div>

        <DateAndTimeDisplayButton 
          selectedAvailability={registrationInfo.availability}
          enabled={false}
        />

        <GuestCounter
          registreeCount={registrationInfo.partySize}
        />

        <PriceDisplay
          isFree={registrationInfo.experience.free}
          pricePerParticipant={registrationInfo.experience.price}
          participantCount={registrationInfo.partySize}
        />

        <CustomModal
          button={
            <button
              className="mt-4 flex w-full items-center justify-center rounded-full px-6 py-4 border-ll-slate border hover:border-ll-black hover:bg-ll-black hover:text-ll-grey transition-all"
              data-cy="change-reservation-button"
            >
              <div className={Typography.ButtonText}>Change Reservation</div>
            </button>
          }
        >
          <ChangeRegistrationModal
            experience={experience}
            activeRegistration={registrationInfo}
            registrations={registrations}
          />
        </CustomModal>
      </div>
    </>
  )
}