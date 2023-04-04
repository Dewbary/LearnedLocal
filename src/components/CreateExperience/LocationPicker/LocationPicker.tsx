import React, { useState, useCallback } from "react";
import Map from "./Map";
import PinButton from "./PinButton";
import { PinContextProvider, usePinContext } from "./PinContext";
import SearchBar from "./SearchBar";

// Default San Francisco
const DefaultLat = 37.749;
const DefaultLng = -122.4194;

export type Pin = {
  lat: number;
  lng: number;
};

const LocationPicker = () => {
  const [center, setCenter] = useState({ lat: DefaultLat, lng: DefaultLng });
  const [isApiLoaded, setApiLoaded] = useState(false);
  const [pinData, setPinData] = useState<Pin[]>([]);

  const handlePinDrop = useCallback(
    ({ lat, lng }: Pin) => {
      if (pinData.length === 0) {
        setPinData([{ lat, lng }]);
      } else {
        setPinData([{ lat, lng }]);
      }

      console.log(pinData);
    },
    [pinData]
  );

  const clearPinData = useCallback(() => {
    setPinData([]);
  }, []);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (place.geometry) {
      setCenter({
        lat: place.geometry.location?.lat() ?? DefaultLat,
        lng: place.geometry.location?.lng() ?? DefaultLng,
      });
      if (place.geometry.location?.lat() && place.geometry.location?.lng()) {
        setPinData([
          {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        ]);
      }
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SearchBar
            onPlaceSelected={handlePlaceSelected}
            onApiReady={handleApiReady}
          />
          <PinButton clearPinData={clearPinData} />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Map
          center={center}
          zoom={20}
          onApiReady={handleApiReady}
          onPinDrop={handlePinDrop}
          markers={pinData}
        />
      </div>
    </div>
  );
};

export default function WrappedLocationPicker() {
  return (
    <PinContextProvider>
      <LocationPicker />
    </PinContextProvider>
  );
}
