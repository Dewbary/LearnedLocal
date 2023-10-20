import * as React from "react";
import Image from "next/image";
import type { ExperienceInfo } from "@learnedlocal/db/types/types";
import type { PropsWithChildren } from "react";
import CardInfo from "../CardInfo";
import CustomModal from "../CustomModal";
import { getModalImpl } from "~/components/ExperiencesDisplay/ExperiencesDisplayUtils";
import CardFavoriteButton from "../CardFavoriteButton";
import fillerCard from "~/public/filler_card.png";

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
    <div>
      <div className="relative">
        <CustomModal
          button={
            <>
              <div className="group aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 group-hover:cursor-pointer">
                <Image
                  alt="experience photo"
                  src={experience.photos[0] || fillerCard}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover",
                    "duration-700 ease-in-out group-hover:cursor-pointer group-hover:opacity-75",
                    isLoading
                      ? "scale-110 blur-2xl grayscale"
                      : "scale-100 blur-0 grayscale-0"
                  )}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            </>
          }
        >
          {getModalImpl(experience, registered)}
        </CustomModal>
        <CardInfo className="" experience={experience} />
        {isHomePageCard && (
          <>
            <div>
              <CardFavoriteButton
                className="absolute bottom-22 left-2 hover:cursor-pointer"
                experienceId={experience.id}
                experienceTitle={experience.title}
              />
            </div>
            {experience.isFull && (
              <div>
                <div className=" absolute bottom-22 right-0 rounded-l-full bg-gradient-to-br from-amber-400 to-amber-500 py-2 pr-6 pl-4 text-lg font-bold text-white shadow-md">
                  Experience Full
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-3 flex flex-row justify-between gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
