import React, { useEffect, useRef } from "react";

type SearchBarProps = {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  onApiReady: () => void;
};

const SearchBar = ({ onPlaceSelected, onApiReady }: SearchBarProps) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchBoxRef.current) {
      return;
    }

    const searchBox = new google.maps.places.SearchBox(searchBoxRef.current);
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places === undefined) return;
      if (places.length === 0) {
        return;
      }
      if (places[0] === undefined) {
        return;
      }
      onPlaceSelected(places[0]);
    });

    onApiReady();

    return () => {
      google.maps.event.clearInstanceListeners(searchBox);
    };
  }, [onPlaceSelected, onApiReady]);

  return (
    <input
      ref={searchBoxRef}
      type="text"
      placeholder="Search location..."
      style={{
        width: "300px",
        height: "30px",
        borderRadius: "5px",
        padding: "5px",
      }}
    />
  );
};

export default SearchBar;
