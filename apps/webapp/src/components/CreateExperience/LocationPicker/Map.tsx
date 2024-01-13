import React, { useEffect, useRef } from "react";
import type { Pin } from "@learnedlocal/db/types/types";
import { usePinContext } from "./PinContext";

type GoogleMapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  onApiReady: () => void;
  onPinDrop: ({ lat, lng }: Pin) => void;
  markers: Pin[];
};

const Map = ({
  center,
  zoom,
  onApiReady,
  onPinDrop,
  markers,
}: GoogleMapProps) => {
  const { pinMode } = usePinContext(); // Use the context
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!googleMapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        disableDefaultUI: true,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        gestureHandling: "greedy",
      });
      googleMapRef.current = map;

      onApiReady();
    } else {
      googleMapRef.current.setCenter(center);
    }
  }, [center, zoom, onApiReady]);

  useEffect(() => {
    if (!googleMapRef.current) {
      return;
    }

    const map = googleMapRef.current;

    if (pinMode) {
      const clickListener = map.addListener(
        "click",
        (e: { latLng: { lat: () => number; lng: () => number } }) => {
          onPinDrop({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
      );

      return () => {
        google.maps.event.removeListener(clickListener);
      };
    }
  }, [pinMode, onPinDrop]);

  useEffect(() => {
    if (!googleMapRef.current) {
      return;
    }

    const map = googleMapRef.current;

    // Remove existing markers from the map
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });

    // Clear the markersRef array
    markersRef.current = [];

    // Add new markers to the map and to the markersRef array
    markers.forEach((marker) => {
      const markerInstance = new google.maps.Marker({
        position: marker,
        map,
      });
      markersRef.current.push(markerInstance);
    });
  }, [markers]);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: 550,
        }}
      />
    </>
  );
};

export default Map;
