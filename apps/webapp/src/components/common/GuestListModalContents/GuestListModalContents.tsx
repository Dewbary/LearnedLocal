import { Registration } from "packages/db";
import { useEffect, useState } from "react";
import { ExperienceInfo } from "~/components/types";
import { api } from "~/utils/api";

type Props = {
    experienceInfo: ExperienceInfo;
}

export default function GuestListModalContents (props: Props) {

  const [registrantList, setRegistrantList] = useState([] as Registration[] | undefined);

    const removeGuest = function (guestId: string) {
      if (
        confirm(
          "Are you sure you want to remove this guest? They will be refunded for their purchase."
        ) === true
      ) {
        removeRegistrant.mutate(guestId);
      }
    };

    const utils = api.useContext();

    const eventRegistrations = api.registration.byExperience.useQuery(
        props.experienceInfo.id,
      );
    
    const removeRegistrant = api.registration.removeRegistrant.useMutation(
      {
        onSuccess: async () => {
          await utils.registration.byExperience.invalidate();
        }
      }
    );

    useEffect(() => {
      setRegistrantList(eventRegistrations.data);
    }, [eventRegistrations.isFetching]);

    return (

      <>
        <div className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg lg:rounded-t-3xl">
          <div className="flex flex-col text-black">
              <h1 className="text-4xl font-bold">{props.experienceInfo.title}</h1>
              <h2>Manage Guest List</h2>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-7 overflow-scroll p-7 lg:flex-row lg:overflow-auto text-black">
          <div className="flex flex-1 flex-col justify-between lg:basis-1/2">
            <div className="h-96 overflow-y-scroll">
              {registrantList?.length === 0 && (
                <div className="flex h-full w-full items-center justify-center">
                  <h1>No guests signed up for this experience yet.</h1>
                </div>
              )}
              {registrantList?.map((registration) => (
                <div
                  key={registration.id}
                  className="flex items-center justify-between border-b bg-slate-100 p-3"
                >
                  <div className="flex items-center justify-start gap-3">
                    <img
                      src="/profile_pic.png"
                      alt="Profile Picture Anonymous"
                      className="rounded-full w-10"
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
                      className="rounded-lg bg-red-400 p-2 text-sm text-white hover:bg-red-500"
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
        
      </>
    );
}