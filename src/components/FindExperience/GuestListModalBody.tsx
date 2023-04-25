import Image from "next/image";
import profile_pic from "../../assets/profile_pic.png"

export default function GuestListModalBody() {
    return (
        <div className="flex flex-col lg:flex-row p-7 gap-7 flex-1">
            <div className="flex flex-col lg:basis-1/2 flex-1 justify-between">
                <div className="overflow-y-scroll h-96">
                    {[...Array(10)].map((e, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-100 p-3 border-b">
                            <div className="flex justify-start items-center gap-3">
                                <Image
                                    src={profile_pic}
                                    alt="Profile Picture Anonymous"
                                    width={40}
                                    className="rounded-full w-auto"
                                />
                                <div>
                                    <h4 className="font-bold">Firstname Lastname</h4>
                                    <h5 className="">Party of 5</h5>
                                </div>
                            </div>
                            <div>
                                <button className="bg-red-400 p-2 rounded-lg text-white text-sm">Remove Guest</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-1 w-full items-center justify-center">
                    <button className="bg-amber-400 h-max p-3 rounded-xl text-white drop-shadow-md">Add Guest</button>
                </div>
            </div>
            <div className="flex flex-col lg:basis-1/2 gap-6">
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