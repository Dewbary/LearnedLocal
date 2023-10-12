import React from "react";

type State = {
    favoritedExperiences: number[];
    setFavoritedExperiences: (experiences: number[]) => void;
    askForEmail: boolean;
    setAskForEmail: (newValue: boolean) => void;
    firstExperienceIdOnDisplay: number;
};

const initialState: State = {
    favoritedExperiences: [],
    setFavoritedExperiences: (experiences: number[]) => {
      return;
    },
    askForEmail: true,
    setAskForEmail: (newValue: boolean) => {
      return;
    },
    firstExperienceIdOnDisplay: 0
};

const FavoritedExperiencesContext = React.createContext(initialState);

export default FavoritedExperiencesContext;