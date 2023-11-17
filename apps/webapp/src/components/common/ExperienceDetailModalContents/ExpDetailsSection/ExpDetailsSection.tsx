import * as React from "react";
import {
  MapPinIcon,
  UserCircleIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { ExperienceInfo } from "packages/db/types/types";
import { format } from "date-fns";
import Button from "../../Button";
import CardFavoriteButton from "../../CardFavoriteButton";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";

type Props = {
  experienceInfo: ExperienceInfo;
  handleViewPageClick: () => void;
};

const ExpDetailsSection = ({ experienceInfo, handleViewPageClick }: Props) => {
  const router = useRouter();

  const redirectUrl =
    router.pathname + "?&experienceId=" + experienceInfo.id.toString();

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-center md:h-5/6">
      <div className="mb-8 font-raleway text-3xl font-bold">
        {experienceInfo.title}
      </div>
      <div className="md:w-5/6">
        <div className="mb-8 line-clamp-[4] font-inter font-light">
          {experienceInfo.description}
        </div>
        <div className="flex justify-between pb-8 font-light">
          <div className="flex flex-col justify-center">
            <div className="flex space-x-4 pb-8">
              <MapPinIcon width={24} height={24} className="text-ll-slate" />
              <div>{experienceInfo.city}, UT</div>{" "}
              {/*TODO: fix hardcoded state name */}
            </div>
            <div className="flex space-x-4">
              <UserCircleIcon
                width={24}
                height={24}
                className="text-ll-slate"
              />
              <div>
                Hosted by {experienceInfo.profile?.firstName}{" "}
                {experienceInfo.profile?.lastName}
              </div>
            </div>
          </div>
          <div className="mr-4 flex flex-col justify-center">
            <div className="flex space-x-4 pb-8">
              <CalendarIcon width={24} height={24} className="text-ll-slate" />
              {experienceInfo.availability.length > 1 ? (
                <div>
                  {format(
                    experienceInfo.availability[0]?.startTime ?? new Date(),
                    "MMMM d"
                  )}{" "}
                  + More
                </div>
              ) : (
                <div>
                  {format(
                    experienceInfo.availability[0]?.startTime ?? new Date(),
                    "MMMM d"
                  )}
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <ClockIcon width={24} height={24} className="text-ll-slate" />
              <div>
                {experienceInfo.availability.length > 1 ? (
                  <div>
                    {format(
                      experienceInfo.availability[0]?.startTime ?? new Date(),
                      "p"
                    )}{" "}
                    + More{" "}
                  </div>
                ) : (
                  <div>
                    {format(
                      experienceInfo.availability[0]?.startTime ?? new Date(),
                      "p"
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-2 md:space-x-8">
          <SignedIn>
            <Button
              className="bg-ll-dark-blue text-white"
              text="See Details"
              onClick={() => {
                handleViewPageClick();
              }}
            />
          </SignedIn>
          <SignedOut>
            {experienceInfo.isExternalListing &&
            experienceInfo.externalListingLink ? (
              <SignInButton
                afterSignInUrl={redirectUrl}
                afterSignUpUrl={redirectUrl}
                mode="modal"
              >
                <div className="flex cursor-pointer items-center justify-center rounded-full bg-ll-dark-blue px-6 py-4 text-center font-inter text-white duration-300 ease-in-out hover:scale-105 hover:opacity-50">
                  Sign In to See Details
                </div>
              </SignInButton>
            ) : (
              <Button
                className="bg-ll-dark-blue text-white"
                text="See Details"
                onClick={() => {
                  handleViewPageClick();
                }}
              />
            )}
          </SignedOut>

          <div>
            <CardFavoriteButton
              className="border-2 border-ll-dark-blue text-ll-dark-blue"
              experienceId={experienceInfo.id}
              experienceTitle={experienceInfo.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpDetailsSection;
