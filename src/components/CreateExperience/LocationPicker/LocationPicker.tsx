import React, { useState, useCallback, useEffect } from "react";
import Map from "./Map";
import PinButton from "./PinButton";
import { usePinContext } from "./PinContext";
import SearchBar from "./SearchBar";

// Default San Francisco
const DefaultLat = 37.749;
const DefaultLng = -122.4194;

export type Pin = {
  lat: number;
  lng: number;
};

type LocationPickerProps = {
  value: Pin | null;
  onLocationChange: (location: Pin) => void;
};

const LocationPicker = ({ value, onLocationChange }: LocationPickerProps) => {
  const [center, setCenter] = useState<Pin>(
    value
      ? { lat: value.lat, lng: value.lng }
      : { lat: DefaultLat, lng: DefaultLng }
  );
  const [isApiLoaded, setApiLoaded] = useState(false);
  const [pinData, setPinData] = useState<Pin[]>(value ? [value] : []);
  const { pinMode, togglePinMode } = usePinContext();

  useEffect(() => {
    if (value) {
      setCenter({ lat: value.lat, lng: value.lng });
      setPinData([value]);
    }
  }, [value]);

  const handlePinDrop = useCallback(
    ({ lat, lng }: Pin) => {
      const newPin: Pin = { lat: lat, lng: lng };
      setPinData([newPin]);
      onLocationChange(newPin);
    },
    [onLocationChange]
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
    <div className="flex flex-col">
      <div className="flex justify-center space-x-4 pb-4">
        <SearchBar
          onPlaceSelected={handlePlaceSelected}
          onApiReady={handleApiReady}
        />
        <PinButton clearPinData={clearPinData} />
      </div>
      <div className="flex-grow">
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

export default LocationPicker;
