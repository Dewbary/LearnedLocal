import React, { useState, useCallback, useEffect } from "react";
import Map from "./Map";
import PinButton from "./PinButton";
import { usePinContext } from "./PinContext";
import SearchBar from "./SearchBar";

// Default BYU
const DEFAULT_LAT = 40;
const DEFAULT_LNG = 111;

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
      : { lat: DEFAULT_LAT, lng: DEFAULT_LNG }
  );
  const [isApiLoaded, setApiLoaded] = useState(false);
  const [pinData, setPinData] = useState<Pin[]>(value ? [value] : []);
  const { pinMode, togglePinMode } = usePinContext();

  useEffect(() => {
    if (value) {
      setCenter({ lat: value.lat, lng: value.lng });
    } else {
      setCenter({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
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
    if (!place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setCenter({
      lat: lat ?? DEFAULT_LAT,
      lng: lng ?? DEFAULT_LNG,
    });

    setPinData([
      {
        lat: lat,
        lng: lng,
      },
    ]);
    onLocationChange({
      lat: lat,
      lng: lng,
    });
  };

  const handleApiReady = () => {
    if (!isApiLoaded) {
      setApiLoaded(true);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap justify-center space-x-4 pb-4">
        <SearchBar
          onPlaceSelected={handlePlaceSelected}
          onApiReady={handleApiReady}
        />
        <PinButton clearPinData={clearPinData} />
      </div>
      <div className="flex h-full flex-col">
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
    </div>
  );
};

export default LocationPicker;
