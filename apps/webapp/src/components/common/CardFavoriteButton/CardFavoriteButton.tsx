import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import React from "react";
import FavoritedExperiencesContext from "~/components/Home/FavoritedExperiencesContext";
import PostFavoriteEmailCollector from "../PostFavoriteEmailCollector";
import { api } from "~/utils/api";

type Props = {
    className?: string;
    experienceId: number;
    experienceTitle: string;
}

export default function CardFavoriteButton(props: Props) {

    const { favoritedExperiences, setFavoritedExperiences, askForEmail, setAskForEmail, firstExperienceIdOnDisplay } = useContext(FavoritedExperiencesContext);
    const [experienceFavorited, setExperienceFavorited] = useState(false);
    const emailRouter = api.email.sendEmailReminders.useMutation();
    const [remindToastVisible, setRemindToastVisible] = useState(false);
    const [initialToolTipTimerExpired, setInitialToolTipTimerExpired] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [isFirstExperience, setIsFirstExperience] = useState(false);

    const handleFavoriteClick = () => {
        if (experienceFavorited) {
            setFavoritedExperiences(favoritedExperiences.filter(id => id !== props.experienceId));
        }
        else {
            setFavoritedExperiences(favoritedExperiences.concat([props.experienceId]));
            if (askForEmail) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                (document?.getElementById(`modal-${props.experienceId}`) as HTMLFormElement).showModal();
            }
        }
    }

    const handleRemindClick = async (newContactEmail: string) => {
        await emailRouter.mutateAsync({ newContactEmail, experienceTitle: props.experienceTitle});
        setRemindToastVisible(true);
        setTimeout(() => setRemindToastVisible(false), 3000);
    }

    const handleCloseClick = () => {
        setAskForEmail(false);
    }

    useEffect(() => {
        if (favoritedExperiences.find(id => id === props.experienceId) !== undefined) {
            setExperienceFavorited(true);
        }
        else {
            setExperienceFavorited(false);
        }
    }, [favoritedExperiences]);


    // The next 3 useEffect calls are related to showing the "favorite" experience tooltip on the homepage.

    useEffect(() => {
        setTimeout(() => setInitialToolTipTimerExpired(true), 5000);
    }, []);

    useEffect(() => {
        if (isFirstExperience && !initialToolTipTimerExpired) {
            setShowToolTip(true);
        }
        else {
            setShowToolTip(false);
        }
    }, [isFirstExperience, initialToolTipTimerExpired]);

    useEffect(() => {
        if (firstExperienceIdOnDisplay === props.experienceId) {
            setIsFirstExperience(true);
        }
        else {
            setIsFirstExperience(false);
        }
    }, [firstExperienceIdOnDisplay]);

    return (
        <>
            <div className={`${props.className || ""} tooltip tooltip-right tooltip-primary ${showToolTip ? "tooltip-open" : ""}`} data-tip="Favorite this experience!">
                <div className={`bg-white p-2 rounded-full`} onClick={() => handleFavoriteClick()}>
                    {experienceFavorited ? (
                        <HeartIconSolid className="w-7 text-red-500 hover:text-red-300"/>
                    ) : (
                        <HeartIconOutline className="w-7 text-red-500 hover:text-red-300"/>
                    )}
                </div>
            </div>
            <PostFavoriteEmailCollector 
                modalId={`modal-${props.experienceId}`} 
                experienceTitle={props.experienceTitle} 
                handleRemindClick={handleRemindClick}
                handleCloseClick={handleCloseClick}
            />
            <div className={`transition-opacity ${remindToastVisible ? "opacity-100 flex" : "opacity-0 hidden"} duration-1000 toast toast-center w-2/3 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-lg bottom-8 z-30`}>
                <div>Success! You&apos;ll be reminded to sign up for {props.experienceTitle}.</div>
            </div>
        </>
        
    );

}