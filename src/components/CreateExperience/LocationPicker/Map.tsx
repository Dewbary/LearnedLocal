import React, { useEffect, useRef } from "react";

type GoogleMapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onApiReady: () => void;
};

const Map = ({ center, zoom, onApiReady }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    onApiReady();
  }, [center, zoom, onApiReady]);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "80%",
          height: "80%",
        }}
      />
    </>
  );
};

export default Map;
