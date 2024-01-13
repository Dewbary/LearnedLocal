import { useContext, useEffect, useState } from "react";
import React from "react";
import FavoritedExperiencesContext from "~/components/Home/FavoritedExperiencesContext";
import PostFavoriteEmailCollector from "../PostFavoriteEmailCollector";
import { api } from "~/utils/api";
import Button from "../Button";

type Props = {
  className?: string;
  experienceId: number;
  experienceTitle: string;
};

export default function CardFavoriteButton(props: Props) {
  const {
    favoritedExperiences,
    setFavoritedExperiences,
    askForEmail,
    setAskForEmail
  } = useContext(FavoritedExperiencesContext);
  const [experienceFavorited, setExperienceFavorited] = useState(false);
  const emailRouter = api.email.sendEmailReminders.useMutation();
  const [remindToastVisible, setRemindToastVisible] = useState(false);

  const handleFavoriteClick = () => {
    if (experienceFavorited) {
      setFavoritedExperiences(
        favoritedExperiences.filter((id) => id !== props.experienceId)
      );
    } else {
      setFavoritedExperiences(
        favoritedExperiences.concat([props.experienceId])
      );
      if (askForEmail) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        (
          document?.getElementById(
            `modal-${props.experienceId}`
          ) as HTMLFormElement
        ).showModal();
      }
    }
  };

  const handleRemindClick = async (newContactEmail: string) => {
    await emailRouter.mutateAsync({
      newContactEmail,
      experienceTitle: props.experienceTitle,
    });
    setRemindToastVisible(true);
    setTimeout(() => setRemindToastVisible(false), 3000);
  };

  const handleCloseClick = () => {
    setAskForEmail(false);
  };

  useEffect(() => {
    if (
      favoritedExperiences.find((id) => id === props.experienceId) !== undefined
    ) {
      setExperienceFavorited(true);
    } else {
      setExperienceFavorited(false);
    }
  }, [favoritedExperiences]);

  return (
    <>
      <Button
        className={props.className}
        text="Save Experience"
        onClick={() => handleFavoriteClick()}
      />

      <PostFavoriteEmailCollector
        modalId={`modal-${props.experienceId}`}
        experienceTitle={props.experienceTitle}
        handleRemindClick={handleRemindClick}
        handleCloseClick={handleCloseClick}
      />
      <div
        className={`transition-opacity ${
          remindToastVisible ? "flex opacity-100" : "hidden opacity-0"
        } toast toast-center bottom-8 z-30 w-2/3 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-white duration-1000`}
      >
        <div>
          Success! You&apos;ll be reminded to sign up for{" "}
          {props.experienceTitle}.
        </div>
      </div>
    </>
  );
}
