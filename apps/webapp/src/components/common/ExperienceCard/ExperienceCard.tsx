import * as React from "react";
import Image from "next/image";
import { ExperienceInfo } from "~/components/types";
import { PropsWithChildren } from "react";
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
  isHomePageCard
}: PropsWithChildren<Props>) {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div>
      <div className="relative">
        <CustomModal
          button={
            <>
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 group-hover:cursor-pointer group">
                <Image
                  alt="experience photo"
                  src={experience.photos[0] || fillerCard}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover",
                    "duration-700 ease-in-out group-hover:opacity-75 group-hover:cursor-pointer",
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
              <CardFavoriteButton className="absolute bottom-22 left-2 hover:cursor-pointer" experienceId={experience.id} experienceTitle={experience.title}/>
            </div>
            {experience.isFull && (
              <div>
                <div className=" bg-gradient-to-br from-amber-400 to-amber-500 absolute bottom-22 right-0 pr-6 py-2 pl-4 rounded-l-full text-lg text-white font-bold shadow-md">Experience Full</div>
              </div>
            )}
          </>
        )}
        
        <div className="flex flex-row justify-between gap-2 mt-3">
          {children}
        </div>
      </div>
    </div>
  );
}
