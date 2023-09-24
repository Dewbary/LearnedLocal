import * as React from "react";
import Image from "next/image";
import { ExperienceInfo } from "~/components/types";
import { PropsWithChildren } from "react";
import CardInfo from "../CardInfo";
import CustomModal from "../CustomModal";
import { getModalImpl } from "~/components/ExperiencesDisplay/ExperiencesDisplayUtils";

type Props = {
  experience: ExperienceInfo;
  registered?: boolean;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ExperienceCard({
  children,
  experience,
  registered = false,
}: PropsWithChildren<Props>) {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <CustomModal
      button={
        <div className="group">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
            <Image
              alt="experience photo"
              src={experience.photos[0] || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover",
                "duration-700 ease-in-out group-hover:opacity-75",
                isLoading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <CardInfo experience={experience} />
          {children}
        </div>
      }
    >
      {getModalImpl(experience, registered)}
    </CustomModal>
  );
}
