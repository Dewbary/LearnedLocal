import * as React from "react";
import { Typography } from "~/components/common/Typography";
import Counter from "~/components/common/Counter";
import ExperienceDateTimeSelect from "./ExperienceDateTimeSelect";
import type { ExperienceInfo } from "packages/db/types/types";
import type { ExperienceAvailability, Registration } from "packages/db";

type Props = {
  experience: ExperienceInfo;
  registrantCount: Registration[] | undefined;
  goToCheckoutPage: (availabilityId: number | null, partySize: number) => void;
};

const EventSignUp = ({
  experience,
  registrantCount,
  goToCheckoutPage,
}: Props) => {
  const [registreeCount, setRegistreeCount] = React.useState<number>(1);
  const [selectedAvailability, setSelectedAvailability] = React.useState<
    ExperienceAvailability | undefined
  >(experience.availability[0]);

  const calculatePrice = () => {
    return (Math.ceil(registreeCount * experience.price * 100) / 100).toFixed(
      2
    );
  };

  return (
    <div className="w-[328px] rounded-2xl border border-ll-slate p-6">
      <div className={Typography.SecondaryTitle}>Event details</div>

      <ExperienceDateTimeSelect
        experience={experience}
        selectedAvailability={selectedAvailability}
        setSelectedAvailability={setSelectedAvailability}
        registrationsCount={registrantCount}
      />

      <div className="mt-4 flex flex-row items-center justify-between rounded-2xl border border-ll-slate px-6 py-4">
        <div className="flex flex-col">
          <div className={Typography.SubTitleUppercase}>Guests</div>
          <div className={Typography.BodyText}>{registreeCount} guest{registreeCount !== 1 ? "s" : ""}</div>
        </div>
        <Counter count={registreeCount} setCount={setRegistreeCount} />
      </div>
      <div className="mt-4 rounded-2xl border border-ll-slate px-6 py-4">
        <div className={Typography.SubTitleUppercase}>Total Price</div>
        <div className={Typography.BodyText}>
          {experience.free ? (
            <>Free</>
          ) : (
            <>${calculatePrice()}</>
          )}
        </div>
        
      </div>
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
