import * as React from "react";
import Image from "next/image";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import type { PropsWithChildren } from "react";
import CustomModal from "../CustomModal";
import { getModalImpl } from "~/components/ExperiencesDisplay/ExperiencesDisplayUtils";
import CardFavoriteButton from "../CardFavoriteButton";
import fillerCard from "~/public/filler_card.png";
import CardInfoV2 from "../CardInfoV2";

type Props = {
  experience: ExperienceInfo;
  registered?: boolean;
  isHomePageCard: boolean;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ExperienceCard({
  children,
  experience,
  registered = false,
  isHomePageCard,
}: PropsWithChildren<Props>) {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div className="relative">
      <CustomModal
        button={
          <div className="group relative aspect-[7/8] overflow-hidden rounded-3xl group-hover:cursor-pointer">
            <Image
              alt="experience photo"
              src={experience.photos[0] || fillerCard}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "relative object-cover",
                "duration-700 ease-in-out group-hover:cursor-pointer group-hover:opacity-75",
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
            <CardInfoV2
              className="absolute bottom-3 left-3 right-3 h-24"
              experience={experience}
            />
          </div>
        }
      >
        {getModalImpl(experience, registered)}
      </CustomModal>
      {isHomePageCard && (
        <>
          {experience.isFull && (
            <div>
              <div className="absolute left-4 right-4 top-4 rounded-full bg-ll-orange py-2 pl-4 pr-6 text-lg font-bold text-white shadow-md">
                Experience Full
              </div>
            </div>
          )}
        </>
      )}
      <div className="mt-3 flex flex-row justify-between gap-2">{children}</div>
    </div>
  );
}
