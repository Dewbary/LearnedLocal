import Image from "next/image";
import profile_pic from "../../assets/profile_pic.png";
import { api } from "~/utils/api";
import { Experience } from "@prisma/client";

type Props = {
  experience: Experience;
};

export default function GuestListModalBody({ experience }: Props) {
  const eventRegistrations = api.registration.byExperience.useQuery(
    experience.id
  );
  const removeRegistrant = api.registration.removeRegistrant.useMutation();

  const removeGuest = async function (guestId: string) {
    if (
      confirm(
        "Are you sure you want to remove this guest? They will be refunded for their purchase."
      ) === true
    ) {
      removeRegistrant.mutate(guestId);
      await eventRegistrations.refetch();
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-7 overflow-scroll p-7 lg:flex-row lg:overflow-auto">
      <div className="flex flex-1 flex-col justify-between lg:basis-1/2">
        <div className="h-96 overflow-y-scroll">
          {eventRegistrations.data?.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <h1>No guests signed up for this experience yet.</h1>
            </div>
          )}
          {eventRegistrations.data?.map((registration) => (
            <div
              key={registration.id}
              className="flex items-center justify-between border-b bg-slate-100 p-3"
            >
              <div className="flex items-center justify-start gap-3">
                <Image
                  src={profile_pic}
                  alt="Profile Picture Anonymous"
                  width={40}
                  className="w-auto rounded-full"
                />
                <div>
                  <h4 className="font-bold">
                    {registration.registrantFirstName}{" "}
                    {registration.registrantLastName}
                  </h4>
                  <h5 className="">Party of {registration.partySize}</h5>
                  <h5 className="">Email: {registration.email}</h5>
                  {registration.phone && (
                    <h5 className="">Phone: {registration.phone}</h5>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    void removeGuest(registration.id);
                  }}
                  className="rounded-lg bg-red-400 p-2 text-sm text-white"
                >
                  Remove Guest
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex w-full flex-1 items-center justify-center">
          {/* UNDER DEVELOPMENT ELEMENT */}
          <div className="absolute inset-0 z-20 h-full w-full bg-gray-400 opacity-50">
            <div className="absolute flex h-full w-full items-center justify-center">
              <h1 className="z-30 text-white">
                This feature is currently under development
              </h1>
            </div>
          </div>
          <button
            disabled
            className="h-max rounded-xl bg-amber-400 p-3 text-white drop-shadow-md"
          >
            Add Custom Guest
          </button>
        </div>
      </div>
      <div className="relative flex flex-col gap-6 lg:basis-1/2">
        {/* UNDER DEVELOPMENT ELEMENT */}
        <div className="absolute inset-0 z-20 h-full w-full bg-gray-400 opacity-50">
          <div className="absolute flex h-full w-full items-center justify-center">
            <h1 className="z-30 text-white">
              This feature is currently under development
            </h1>
          </div>
        </div>

        <h1 className="text-xl font-bold">Send Message to Guests</h1>
        <textarea className="h-56 max-h-56 rounded-md border border-slate-500 text-start" />
        <div className="flex w-full items-center justify-between gap-4 px-1">
          <p className="text-sm italic text-gray-500">
            This message will be emailed to all participants currently signed up
            for the event.
          </p>
          <button className="rounded-xl bg-amber-400 py-3 px-5 text-white drop-shadow-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
