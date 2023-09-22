import React, { useEffect, useRef } from "react";

type SearchBarProps = {
  // @ts-ignore
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  onApiReady: () => void;
};

const SearchBar = ({ onPlaceSelected, onApiReady }: SearchBarProps) => {
  const searchBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchBoxRef.current) {
      return;
    }

    // @ts-ignore
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
      searchBox.unbindAll();
    };
  }, [onPlaceSelected, onApiReady]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="">
      <input
        ref={searchBoxRef}
        type="text"
        placeholder="Search location..."
        className="w-72 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
