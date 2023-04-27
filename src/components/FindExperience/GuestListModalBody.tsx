import Image from "next/image";
import profile_pic from "../../assets/profile_pic.png"
import { api } from "~/utils/api";
import { Experience } from "@prisma/client";

type Props = {
    experience: Experience;
}

export default function GuestListModalBody({ experience }: Props) {

    const eventRegistrations = api.registration.byExperience.useQuery(experience.id);
    const removeRegistrant = api.registration.removeRegistrant.useMutation();

    const removeGuest = async function (guestId: string) {
        if (confirm("Are you sure you want to remove this guest? They will be refunded for their purchase.") === true) {
            removeRegistrant.mutate(guestId);
            await eventRegistrations.refetch();
        }
    }

    return (
        <div className="flex flex-col lg:flex-row p-7 gap-7 flex-1 overflow-scroll lg:overflow-auto">
            <div className="flex flex-col lg:basis-1/2 flex-1 justify-between">
                <div className="overflow-y-scroll h-96">
                    {eventRegistrations.data?.length === 0 &&
                        <div className="flex h-full w-full justify-center items-center">
                            <h1>No guests signed up for this experience yet.</h1>
                        </div>
                    }
                    {eventRegistrations.data?.map(registration => (
                        <div key={registration.id} className="flex justify-between items-center bg-slate-100 p-3 border-b">
                            <div className="flex justify-start items-center gap-3">
                                <Image
                                    src={profile_pic}
                                    alt="Profile Picture Anonymous"
                                    width={40}
                                    className="rounded-full w-auto"
                                />
                                <div>
                                    <h4 className="font-bold">{registration.registrantFirstName} {registration.registrantLastName}</h4>
                                    <h5 className="">Party of 5</h5>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {void removeGuest(registration.id)}} className="bg-red-400 p-2 rounded-lg text-white text-sm">Remove Guest</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-1 w-full items-center justify-center mt-3 relative">
                    {/* UNDER DEVELOPMENT ELEMENT */}
                    <div className="absolute inset-0 w-full h-full bg-gray-400 z-20 opacity-50">
                        <div className="absolute w-full h-full flex justify-center items-center">
                            <h1 className="text-white z-30">This feature is currently under development</h1>
                        </div>
                    </div>
                    <button disabled className="bg-amber-400 h-max p-3 rounded-xl text-white drop-shadow-md">Add Custom Guest</button>
                </div>
            </div>
            <div className="flex flex-col lg:basis-1/2 gap-6 relative">
                
                {/* UNDER DEVELOPMENT ELEMENT */}
                <div className="absolute inset-0 w-full h-full bg-gray-400 z-20 opacity-50">
                    <div className="absolute w-full h-full flex justify-center items-center">
                        <h1 className="text-white z-30">This feature is currently under development</h1>
                    </div>
                </div>

                <h1 className="text-xl font-bold">
                    Send Message to Guests
                </h1>
                <textarea className="h-56 max-h-56 rounded-md border border-slate-500 text-start"/>
                <div className="flex w-full justify-between items-center px-1 gap-4">
                    <p className="text-sm text-gray-500 italic">This message will be emailed to all participants currently signed up for the event.</p>
                    <button className="bg-amber-400 py-3 px-5 rounded-xl text-white drop-shadow-md">Send</button>
                </div>
            </div>
        </div>
    );
}