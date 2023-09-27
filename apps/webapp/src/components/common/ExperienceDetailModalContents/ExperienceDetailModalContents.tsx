import { ExperienceInfo } from "~/components/types";
import ExperienceImageDisplay from "../ExperienceImageDisplay";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  experienceInfo: ExperienceInfo;
  showRegisteredDetails: boolean;
};

export default function ExperienceDetailModalContents(props: Props) {
  const router = useRouter();

  const handleViewPageClick = async function (experienceId: number) {
    window.gtag("event", "view_details");
    await router.push(`/experience/view/${experienceId}`);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg lg:rounded-t-3xl">
        <div className="flex w-full flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold lg:text-4xl">
              {props.experienceInfo.title}
            </h1>
            <p>
              <span className="lg:text-md align-middle text-sm">Hosted By</span>
              <span className="inline-block">
                <Image
                  src={props.experienceInfo.profile?.profileImage ?? ""}
                  alt="Profile Picture"
                  className="mx-2 inline w-5 rounded-full object-cover"
                  width={50}
                  height={50}
                />
                <span className="lg:text-md align-middle text-sm text-yellow-600">
                  {props.experienceInfo.profile?.firstName}{" "}
                  {props.experienceInfo.profile?.lastName}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex flex-grow overflow-y-scroll">
        <div className="basis-full">
          {/* IMAGES PORTION */}
          <ExperienceImageDisplay photos={props.experienceInfo.photos} />

          {/* DESCRIPTION PORTION */}
          <div className="mx-10 flex flex-col lg:flex-row">
            {props.showRegisteredDetails && (
              <div className="lg:order-0 order-2 mr-3 mb-3 basis-2/3">
                <h3 className="text-xl font-bold">Contact Host</h3>
                <p>Email: {props.experienceInfo.profile?.email}</p>
                {props.experienceInfo.profile?.phone && (
                  <p>Phone: {props.experienceInfo.profile?.phone}</p>
                )}
              </div>
            )}
            <div className="lg:order-0 order-2 mr-3 basis-2/3">
              <h3 className="text-xl font-bold">Description</h3>
              <p>{props.experienceInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between border-t py-4 pl-6 pr-6">
        <div className="text-3xl font-bold">
          {props.experienceInfo.free
            ? "Free"
            : `$${props.experienceInfo.price}`}
        </div>
        <button
          className={
            "rounded-lg bg-amber-400 p-3 text-white disabled:cursor-not-allowed disabled:bg-gray-500"
          }
          onClick={() => handleViewPageClick(props.experienceInfo.id)}
        >
          View Details
        </button>
      </div>
    </>
  );
}
