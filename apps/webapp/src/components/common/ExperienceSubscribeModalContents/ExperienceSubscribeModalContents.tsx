import { ExperienceInfo } from "~/components/types";

type Props = {
    experienceInfo: ExperienceInfo;
}

export default function ExperienceSubscribeModalContents(props: Props) {
    return (
        <>
            <div className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg lg:rounded-t-3xl">
                <h2 className="text-3xl font-bold">
                    Get Notified for this Experience
                </h2>
            </div>
            <iframe
              src={props.experienceInfo.notifyIFrameLink || ""}
              title="Subscription Form"
              className="h-full w-full pr-4"
            />
        </>
    );
}