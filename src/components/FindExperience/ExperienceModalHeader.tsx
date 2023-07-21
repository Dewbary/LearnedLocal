import { Experience, Profile } from "@prisma/client";
import Image from "next/image";
import { ExperienceInfo } from "../types";

type Props = {
  experience: ExperienceInfo;
  hostProfile?: Profile | null;
};

export default function ExperienceModalHeader({
  experience,
  hostProfile,
}: Props) {
  const dateDisplayOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  } as const;

  return (
    <div className="flex w-full flex-col justify-between lg:flex-row lg:items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold lg:text-4xl">{experience.title}</h1>
        <p>
          <span className="lg:text-md align-middle text-sm">Hosted By</span>
          <span className="inline-block">
            <Image
              src={hostProfile?.profileImage ?? ""}
              alt="Profile Picture"
              className="mx-2 inline w-5 rounded-full object-cover"
              width={50}
              height={50}
            />
            <span className="lg:text-md align-middle text-sm text-yellow-600">
              {hostProfile?.firstName} {hostProfile?.lastName}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
