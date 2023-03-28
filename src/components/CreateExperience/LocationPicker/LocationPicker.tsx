import React, { useState } from "react";
import Map from "./Map";
import SearchBar from "./SearchBar";

// Default San Francisco
const DefaultLat = 37.749;
const DefaultLng = -122.4194;

const LocationPicker = () => {
  const [center, setCenter] = useState({ lat: DefaultLat, lng: DefaultLng });
  const [isApiLoaded, setApiLoaded] = useState(false);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      setCenter({
        lat: place.geometry.location?.lat() ?? 37.749,
        lng: place.geometry.location?.lng() ?? -122.4194,
      });
    }
  };

  const handleApiReady = () => {
    if (!isApiLoaded) {
      setApiLoaded(true);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <SearchBar
          onPlaceSelected={handlePlaceSelected}
          onApiReady={handleApiReady}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Map center={center} zoom={12} onApiReady={handleApiReady} />
      </div>
    </div>
  );
};

export default LocationPicker;
